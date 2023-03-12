import {
  AnyMatch,
  Augmentation,
  CodeAssistErrorType,
  CodeAssistType,
  countCodePoints,
  createDiff,
  FileContent,
  getFileExtension,
  FileTypes,
  processFiles,
  SourceDocumentFactory,
} from "@p42/engine";
import assert from "assert";
import fs from "fs";
import * as _ from "lodash";
import ts from "typescript";
import { catchError, catchErrorAsync } from "./catchError";
import { ScanConfiguration } from "./ScanConfiguration";
import { ScanResult } from "./ScanResult";

type ScanRunnerFunctions = {
  getFileSize: (file: string) => Promise<number>;
  readFile: (file: string) => Promise<string>;
  createDiff: (
    file: string,
    originalContent: string,
    newContent: string
  ) => string;
  processFiles: (
    directory: string,
    shouldProcessFile: (relativePath: string) => boolean,
    processFile: (relativePath: string, fullPath: string) => Promise<void>
  ) => Promise<void>;
};

type RunStatistics = {
  suggestionCount: number;
};

export class ScanRunner {
  private readonly maxFileSize: number = 512 * 1024;

  private readonly configuration: ScanConfiguration;

  private readonly functions: ScanRunnerFunctions;

  /**
   * File extensions that should be scanned.
   * @private
   */
  private readonly supportedFileExtensions = new Set<string>();

  private readonly codeAssistTypes: Array<CodeAssistType<AnyMatch>>;

  private readonly sourceDocumentFactory: SourceDocumentFactory;

  /**
   * @param functions
   *        Base function definitions. Should only be set when needed in tests.
   */
  constructor(
    augmentations: Array<Augmentation<any>>,
    codeAssistTypes: Array<CodeAssistType<AnyMatch>>,
    configuration: ScanConfiguration,
    functions: ScanRunnerFunctions = {
      getFileSize: async (file: string) => (await fs.promises.stat(file)).size,
      readFile: async (file: string) =>
        fs.promises.readFile(file, { encoding: "utf8" }),
      createDiff,
      processFiles,
    }
  ) {
    // todo better configuration validation with special exception and return code in CLI
    assert(
      _.isInteger(configuration.maxDiffSize),
      "configuration.maxDiffSize must be an integer"
    );

    this.configuration = configuration;
    this.functions = functions;

    // only use code assists that produce suggestions in the scan
    // if included code assists are specified in the configuration, only run those
    this.codeAssistTypes = codeAssistTypes.filter(
      (codeAssist) =>
        codeAssist.producesSuggestions &&
        (configuration.refactorings == null ||
          configuration.refactorings.includes(codeAssist.id))
    );

    this.sourceDocumentFactory = new SourceDocumentFactory(
      augmentations,
      this.codeAssistTypes
    );

    // scan for supported file extensions
    for (const codeAssistType of this.codeAssistTypes) {
      for (const extension of FileTypes.getSupportedFileExtensions(
        codeAssistType
      )) {
        this.supportedFileExtensions.add(extension);
      }
    }
  }

  static createDiffTooLargeErrorMessage(length: number, maxDiffSize: number) {
    return `Diff is ${length} characters long (limit: ${maxDiffSize}).`;
  }

  static createFileTooLargeErrorMessage(fileSize: number, maxFileSize: number) {
    return `File size is ${fileSize} byte (limit: ${maxFileSize}).`;
  }

  private async getFileSize(file: string): Promise<number> {
    return catchErrorAsync(
      () => this.functions.getFileSize(file),
      CodeAssistErrorType.STAT_ERROR
    );
  }

  private async runOnFile(
    relativePath: string,
    fullPath: string,
    statistics: RunStatistics,
    processResult: (result: ScanResult) => void
  ) {
    try {
      const fileSize = await this.getFileSize(fullPath);

      if (fileSize > this.maxFileSize) {
        processResult({
          type: "error",
          errorType: CodeAssistErrorType.FILE_TOO_LARGE,
          path: relativePath,
          message: ScanRunner.createFileTooLargeErrorMessage(
            fileSize,
            this.maxFileSize
          ),
        });
        return;
      }

      const sourceDocument =
        await this.sourceDocumentFactory.createSourceDocument({
          content: new FileContent(
            fullPath,
            undefined,
            this.functions.readFile
          ),
          handleAugmentationError: (
            augmentation: Augmentation<any>,
            node: ts.Node,
            error: any
          ) => {
            processResult({
              type: "error",
              path: relativePath,
              errorType: CodeAssistErrorType.AUGMENTATION_ERROR,
              message: error.message ?? error,
            });
          },
        });

      const originalText = sourceDocument.text;
      const { codeAssists, errors } =
        await sourceDocument.getSuggestedCodeAssists({
          codeAssistTypeIds: this.codeAssistTypes.map((type) => type.id),
        });

      for (const error of errors) {
        const anyError = error as any;
        processResult({
          type: "error",
          errorType: anyError.type ?? CodeAssistErrorType.UNKNOWN,
          path: relativePath,
          message: anyError.message ?? error,
        });
      }

      for (const codeAssist of codeAssists) {
        try {
          const { edit } = await sourceDocument.getCodeAssistAction({
            codeAssistId: codeAssist.id,
            interactiveInput: undefined,
          });

          if (edit == null) {
            continue;
          }

          const transformedText = edit.applyTo(originalText);

          if (transformedText == null || transformedText === originalText) {
            continue;
          }

          const diff = this.diff(relativePath, originalText, transformedText!);

          // Using code point count instead of string length, since JetBrains exposed
          // tests against the code point count.
          const codePointCount = countCodePoints(diff);

          if (codePointCount > this.configuration.maxDiffSize) {
            processResult({
              type: "error",
              errorType: CodeAssistErrorType.DIFF_TOO_LARGE,
              path: relativePath,
              refactoring: codeAssist.type.id,
              message: ScanRunner.createDiffTooLargeErrorMessage(
                codePointCount,
                this.configuration.maxDiffSize
              ),
            });
            continue;
          }

          const primaryRange = codeAssist.primaryLineCharacterRange;

          processResult({
            type: "suggestion",
            path: relativePath,
            refactoring: codeAssist.type.id,
            message: codeAssist.description,
            safetyLevel: codeAssist.safety.level,
            safetyMessage: codeAssist.safety.message,
            diff,
            replacementText: edit.replacement,
            startLine: primaryRange.start.line,
            startColumn: primaryRange.start.character,
            endLine: primaryRange.end.line,
            endColumn: primaryRange.end.character,
          });

          statistics.suggestionCount++;
        } catch (error: any) {
          processResult({
            type: "error",
            errorType: error.type ?? CodeAssistErrorType.UNKNOWN,
            path: relativePath,
            refactoring: codeAssist.type.id,
            message: error.message ?? error,
          });
        }
      }

      // send file summary with lines of code:
      processResult({
        type: "fileStatistics",
        path: relativePath,
        linesOfCode: sourceDocument.getLineCount(),
      });
    } catch (error: any) {
      processResult({
        type: "error",
        errorType: error.type ?? CodeAssistErrorType.UNKNOWN,
        path: relativePath,
        message: error.message ?? error,
      });
    }
  }

  private shouldTransformFile(relativePath: string): boolean {
    return (
      this.hasSupportedExtension(relativePath) &&
      this.isInIncludedPath(relativePath) &&
      !this.isInExcludedPath(relativePath)
    );
  }

  private hasSupportedExtension(relativePath: string): boolean {
    const extension = getFileExtension(relativePath);
    return extension != null && this.supportedFileExtensions.has(extension);
  }

  private isInIncludedPath(relativePath: string): boolean {
    return (
      this.configuration.includedPaths == null ||
      this.configuration.includedPaths.some((includedPath) =>
        relativePath.startsWith(includedPath)
      )
    );
  }

  private isInExcludedPath(relativePath: string): boolean {
    return this.configuration.excludedPaths.some((excludedPath) =>
      relativePath.startsWith(excludedPath)
    );
  }

  async runOnDirectory(
    directory: string,
    processResult: (result: ScanResult) => void
  ) {
    const statistics: RunStatistics = {
      suggestionCount: 0,
    };

    await this.functions.processFiles(
      directory,
      (relativePath: string) => this.shouldTransformFile(relativePath),
      (relativePath, fullPath) =>
        this.runOnFile(relativePath, fullPath, statistics, processResult)
    );

    // Send total suggestion count from this scan run.
    // This is needed to deal with PubSub race conditions and check reporting to GitHub.
    processResult({
      type: "scanStatistics",
      suggestionCount: statistics.suggestionCount,
    });
  }

  private diff(
    file: string,
    originalContent: string,
    newContent: string
  ): string {
    return catchError(
      () => this.functions.createDiff(file, originalContent, newContent),
      CodeAssistErrorType.DIFF_ERROR
    );
  }
}
