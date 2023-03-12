import { ConfigurationManager } from "@p42/app-vscode-shared/build/configuration/ConfigurationManager";
import { LogLevel } from "@p42/app-vscode-shared/build/logger/Logger";
import { PerformanceLoggerFactory } from "@p42/app-vscode-shared/build/logger/PerformanceLoggerFactory";
import { matchesGlobPattern } from "@p42/app-vscode-shared/build/util/fs/matchesGlobPattern";
import * as p42 from "@p42/engine";
import * as _ from "lodash";
import ts from "typescript";
import * as vscode from "vscode";
import { WorkspaceFileContent } from "../content/WorkspaceFileContent";
import { OutputChannelLogger } from "../log/OutputChannelLogger";
import { findFilesInFolder } from "../util/fs/findFilesInFolder";
import { getWorkspaceFolderRelativePath } from "../util/fs/getWorkspaceFolderRelativePath";
import { isDirectory } from "../util/fs/isDirectory";

async function selectCodeAssist(
  codeAssistTypes: Array<p42.CodeAssistType<any>>,
  path: string
) {
  const items = _.sortBy(
    codeAssistTypes.map((codeAssistType) => ({
      codeAssistId: codeAssistType.id,
      label: codeAssistType.title,
      description: codeAssistType.categoryDescription,
      detail: codeAssistType.metadata.documentation.shortDescription,
    })),
    (item) => item.label
  );

  // matchOnDescription and matchOnDetail are enabled, so the user
  // can search for ES versions and words like 'template' that might
  // not be part of the refactoring title.
  return vscode.window.showQuickPick(items, {
    title: `Refactor JavaScript and TypeScript code in '${path}'`,
    matchOnDescription: true,
    matchOnDetail: true,
    placeHolder: "Select refactoring...",
  });
}

export const createMassRefactorCommand =
  ({
    logger,
    sourceDocumentFactory,
    configurationManager,
    performanceLoggerFactory,
    baseUrl,
  }: {
    logger: OutputChannelLogger;
    sourceDocumentFactory: p42.SourceDocumentFactory;
    configurationManager: ConfigurationManager;
    performanceLoggerFactory: PerformanceLoggerFactory;
    baseUrl: string;
  }) =>
  async (uri: vscode.Uri) => {
    const path = getWorkspaceFolderRelativePath(uri);
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
    const workspaceFolderUri = workspaceFolder?.uri.toString();

    try {
      const configuration = await configurationManager.getConfiguration(
        workspaceFolderUri
      );

      const massRefactoringCodeAssistTypes =
        sourceDocumentFactory.codeAssistTypes.filter(
          (codeAssistType) =>
            configuration.isCodeAssistEnabled(codeAssistType) &&
            codeAssistType.producesSuggestions
        );

      const selection = await selectCodeAssist(
        massRefactoringCodeAssistTypes,
        path
      );

      if (selection == null) {
        return;
      }

      const codeAssistType = massRefactoringCodeAssistTypes.find(
        (codeAssistType) => codeAssistType.id === selection.codeAssistId
      );

      if (codeAssistType == null) {
        return;
      }

      logger.log(LogLevel.INFO, {
        path,
        message: `Starting to refactor with "${codeAssistType.title}"...`,
      });

      logger.log(LogLevel.INFO, {
        path,
        message: `Refactoring Details: ${baseUrl}/documentation/code-assist/${codeAssistType.id}`,
      });

      const excludedPathPatterns = configuration.getExcludedPathPatterns();
      if (excludedPathPatterns.length > 0) {
        logger.log(LogLevel.INFO, {
          path,
          message: `Excluded path patterns: ${excludedPathPatterns
            .map((pattern) => `"${pattern}"`)
            .join(", ")}`,
        });
      }

      const count = {
        totalFiles: 0,
        modifiedFiles: 0,
        occurrences: 0,
        warnings: 0,
        errors: 0,
      };

      const startMilliseconds = Date.now();

      logger.showOutput();

      if (await isDirectory(uri)) {
        const files = await findFilesInFolder(
          uri,
          p42.FileTypes.getSupportedFileExtensions(codeAssistType)
        );

        for (const fileUri of files) {
          await refactorFile(
            fileUri,
            logger,
            sourceDocumentFactory,
            codeAssistType,
            performanceLoggerFactory,
            count,
            excludedPathPatterns
          );
        }
      } else {
        await refactorFile(
          uri,
          logger,
          sourceDocumentFactory,
          codeAssistType,
          performanceLoggerFactory,
          count,
          excludedPathPatterns
        );
      }

      logger.log(LogLevel.INFO, {
        path,
        message: `Finished refactoring with "${
          codeAssistType.title
        }" in ${p42.composeCountLabel(
          Math.floor((Date.now() - startMilliseconds) / 1000) + 1,
          "seconds"
        )}.`,
      });

      logger.log(LogLevel.INFO, {
        path,
        message: composeSummaryMessage(codeAssistType, count),
      });
    } catch (error: any) {
      logger.error({ path, message: "Refactoring failed", error });
    }
  };

function composeSummaryMessage(
  codeAssistType: p42.CodeAssistType<any>,
  count: {
    modifiedFiles: number;
    occurrences: number;
    warnings: number;
    errors: number;
  }
) {
  let message: string =
    count.occurrences === 0
      ? `No refactoring opportunities for "${codeAssistType.title}" found`
      : `Refactored ${p42.composeCountLabel(
          count.modifiedFiles,
          "files"
        )} with ${p42.composeCountLabel(
          count.occurrences,
          `"${codeAssistType.title}" occurrences`
        )}`;

  if (count.warnings > 0) {
    message += ` (${p42.composeCountLabel(count.warnings, "warnings")})`;
  }

  if (count.errors > 0) {
    message += ` (${p42.composeCountLabel(count.errors, "errors")})`;
  }

  return `${message}.`;
}

async function refactorFile(
  fileUri: vscode.Uri,
  logger: OutputChannelLogger,
  sourceDocumentFactory: p42.SourceDocumentFactory,
  codeAssistType: p42.CodeAssistType<p42.AnyMatch>,
  performanceLoggerFactory: PerformanceLoggerFactory,
  count: {
    totalFiles: number;
    modifiedFiles: number;
    occurrences: number;
    warnings: number;
    errors: number;
  },
  excludedPathPattern: string[]
) {
  const path = getWorkspaceFolderRelativePath(fileUri);

  if (matchesGlobPattern(path, excludedPathPattern)) {
    return;
  }

  try {
    const allCodeAssists: Array<Array<p42.SuggestedCodeAssist>> = [];
    const allApplicationResults: Array<Array<p42.CodeAssistApplicationResult>> =
      [];

    const result = await p42.runMultiphase({
      content: new WorkspaceFileContent(fileUri),
      sourceDocumentFactory,
      codeAssistProvider: {
        async getCodeAssists(sourceDocument) {
          const { codeAssists, errors } =
            await sourceDocument.getSuggestedCodeAssists({
              codeAssistTypeIds: [codeAssistType.id],
            });

          for (const error of errors) {
            logger.error({
              path,
              message: `error identifying refactoring`,
              error,
            });
            count.errors++;
          }

          allCodeAssists.push(codeAssists);
          return codeAssists;
        },
        recordApplicationResults(results) {
          allApplicationResults.push(results);
        },
      },
      handleAugmentationError: (
        augmentation: p42.Augmentation<any>,
        node: ts.Node,
        error: any
      ) => {
        logger.error({
          path,
          message: `augmentation '${augmentation.id}', node '${p42.getId(
            node
          )}'`,
          error,
        });
        count.errors++;
      },
      performanceRecorder:
        performanceLoggerFactory.createPerformanceLogger(path),
      maxIterations: 20,
    });

    // show regular message to indicate progress if no matches are found
    if (++count.totalFiles % 50 === 0) {
      logger.infoMessage(`${count.totalFiles} files analyzed.`);
    }

    let occurrenceCount = 0;
    let warningCount = 0;

    // collect stats
    const appliedCodeAssists = allCodeAssists.flatMap((codeAssists, index) => {
      if (codeAssists.length === 0) {
        return codeAssists;
      }

      const applicationResultsById = new Map<
        p42.CodeAssistApplicationResult["codeAssistId"],
        p42.CodeAssistApplicationResult["result"]
      >();

      for (const applicationResult of allApplicationResults[index]) {
        const { codeAssistId, result } = applicationResult; // TODO apply push up (once fixed)
        applicationResultsById.set(codeAssistId, result);
      }

      return codeAssists.filter(
        (codeAssist) => applicationResultsById.get(codeAssist.id) === "applied"
      );
    });

    const unsafeCodeAssists = appliedCodeAssists.filter(
      (value) => !value.safety.isSafe()
    );

    for (const unsafeCodeAssist of unsafeCodeAssists) {
      const startLine = unsafeCodeAssist.primaryLineCharacterRange.start.line;
      const safetyMessage =
        unsafeCodeAssist.safety.message ??
        (unsafeCodeAssist.safety.isUnknown()
          ? "no safety analysis available"
          : "can change program behavior");

      logger.warn({
        path,
        message: `line ${startLine}: ${safetyMessage}`,
      });
    }

    occurrenceCount += appliedCodeAssists.length;
    warningCount += unsafeCodeAssists.length;

    if (!result.hasChanged) {
      return;
    }

    logger.info({
      path,
      message: `Refactored ${p42.composeCountLabel(
        occurrenceCount,
        "occurrences"
      )}${
        warningCount > 0
          ? ` (${p42.composeCountLabel(warningCount, "warnings")})`
          : ""
      }`,
    });

    count.modifiedFiles++;
    count.warnings += warningCount;
    count.occurrences += occurrenceCount;

    await vscode.workspace.fs.writeFile(
      fileUri,
      Buffer.from(result.content, "utf8")
    );
  } catch (error) {
    logger.error({
      path,
      message: `Refactoring "${codeAssistType.title}" failed`,
      error,
    });
    count.errors++;
  }
}
