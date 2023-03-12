import * as _ from "lodash";
import { Augmentation } from "../augmentation/Augmentation";
import { AugmentationErrorHandler } from "../augmentation/AugmentationErrorHandler";
import { AnyMatch } from "../matcher/engine/Match";
import { NodeIndex } from "../matcher/engine/NodeIndex";
import { PatternMatcherEngine } from "../matcher/engine/PatternMatcherEngine";
import { parse } from "../parser/parse";
import { ParseResult } from "../parser/ParseResult";
import { ScriptMetadata } from "../matcher/engine/ScriptMetadata";
import { CancellationToken } from "../util/concurrency/CancellationToken";
import { NullCancellationToken } from "../util/concurrency/NullCancellationToken";
import { OperationCanceledException } from "../util/concurrency/OperationCanceledException";
import {
  NullPerformanceRecorder,
  PerformanceRecorder,
} from "../util/performance/PerformanceRecorder";
import { CodeAssistEngine } from "./CodeAssistEngine";
import { CodeAssistErrorType } from "./CodeAssistErrorType";
import { CodeAssistType } from "./CodeAssistType";
import { Content } from "./Content";
import { EmbeddedSource } from "./EmbeddedSource";
import { SourceDocument } from "./SourceDocument";
import { asStructuredError } from "./StructuredError";

export class SourceDocumentFactory {
  constructor(
    readonly augmentations: Array<Augmentation<any>>,
    readonly codeAssistTypes: Array<CodeAssistType<AnyMatch>>
  ) {}

  async createSourceDocument({
    content,
    handleAugmentationError = _.noop,
    performanceRecorder = NullPerformanceRecorder,
    cancellationToken = NullCancellationToken,
  }: {
    content: Content;
    handleAugmentationError?: AugmentationErrorHandler;
    performanceRecorder?: PerformanceRecorder;
    cancellationToken?: CancellationToken;
  }): Promise<SourceDocument> {
    const text = await this.#loadContent(content);

    await cancellationToken.deferAndThrowIfCancellationRequested();

    const parseResults = await this.#parse(
      content.path,
      content.extension,
      text,
      performanceRecorder,
      cancellationToken
    );

    const sourceRanges = [];
    for (let i = 0; i < parseResults.length; i++) {
      const parseResult = parseResults[i];

      await cancellationToken.deferAndThrowIfCancellationRequested();

      const matcherEngine = await this.#initializeMatcherEngine(
        parseResult,
        handleAugmentationError,
        performanceRecorder,
        cancellationToken
      );

      await cancellationToken.deferAndThrowIfCancellationRequested();

      const { range } = parseResult;

      sourceRanges.push(
        new EmbeddedSource(
          i,
          text,
          range,
          new CodeAssistEngine(
            content,
            text,
            range,
            matcherEngine,
            performanceRecorder
          ),
          parseResult.sourceFile.fileName,
          parseResult.sourceFile.languageVersion,
          parseResult.scriptKind
        )
      );
    }

    return new SourceDocument(text, this.codeAssistTypes, sourceRanges);
  }

  async createEngines(
    content: Content,
    augmentationErrorHandler: AugmentationErrorHandler,
    performanceRecorder: PerformanceRecorder = NullPerformanceRecorder,
    cancellationToken: CancellationToken = NullCancellationToken
  ): Promise<Array<CodeAssistEngine>> {
    const originalText = await this.#loadContent(content);

    await cancellationToken.deferAndThrowIfCancellationRequested();

    const parseResults = await this.#parse(
      content.path,
      content.extension,
      originalText,
      performanceRecorder,
      cancellationToken
    );

    const engines = [];
    for (const parseResult of parseResults) {
      await cancellationToken.deferAndThrowIfCancellationRequested();

      const matcherEngine = await this.#initializeMatcherEngine(
        parseResult,
        augmentationErrorHandler,
        performanceRecorder,
        cancellationToken
      );

      await cancellationToken.deferAndThrowIfCancellationRequested();

      engines.push(
        new CodeAssistEngine(
          content,
          originalText,
          parseResult.range,
          matcherEngine,
          performanceRecorder
        )
      );
    }

    return engines;
  }

  async #initializeMatcherEngine(
    parseResult: ParseResult,
    augmentationErrorHandler: AugmentationErrorHandler,
    performanceRecorder: PerformanceRecorder,
    cancellationToken: CancellationToken
  ): Promise<PatternMatcherEngine> {
    try {
      const nodes = performanceRecorder.run(
        "index",
        "overview",
        () => new NodeIndex(parseResult.sourceFile)
      );

      await cancellationToken.deferAndThrowIfCancellationRequested();

      const sourceModuleKind = parseResult.getSourceModuleKind(nodes);

      const scriptMetadata = new ScriptMetadata({
        extension: parseResult.extension,
        range: parseResult.range,
        language: parseResult.language,
        scriptKind: parseResult.scriptKind,
        sourceModuleKind: sourceModuleKind.id,
        areTopLevelVariablesLocal: parseResult.areTopLevelVariablesLocal,
        isVarGlobal: sourceModuleKind.isVarGlobal,
      });

      await cancellationToken.deferAndThrowIfCancellationRequested();

      const matcherEngine = new PatternMatcherEngine(
        nodes,
        scriptMetadata,
        parseResult.typeSystem,
        this.augmentations,
        performanceRecorder,
        cancellationToken
      );

      await cancellationToken.deferAndThrowIfCancellationRequested();

      await performanceRecorder.runAsync(
        "augment - total",
        "overview",
        async () => {
          await matcherEngine.augment(augmentationErrorHandler);
        }
      );

      await cancellationToken.deferAndThrowIfCancellationRequested();

      return matcherEngine;
    } catch (error: any) {
      if (error instanceof OperationCanceledException) {
        throw error;
      }

      throw asStructuredError(
        error,
        CodeAssistErrorType.MATCHER_ENGINE_INITIALIZATION_ERROR
      );
    }
  }

  async #loadContent(content: Content): Promise<string> {
    try {
      return content.load();
    } catch (error: any) {
      throw asStructuredError(error, CodeAssistErrorType.LOAD_ERROR);
    }
  }

  async #parse(
    fileName: string,
    extension: string | undefined,
    content: string,
    performanceRecorder: PerformanceRecorder,
    cancellationToken: CancellationToken
  ): Promise<Array<ParseResult>> {
    try {
      // await is needed for try..catch
      return await performanceRecorder.runAsync("parse", "overview", () =>
        parse(fileName, extension, content, cancellationToken)
      );
    } catch (error) {
      if (error instanceof OperationCanceledException) {
        throw error;
      }

      throw asStructuredError(error, CodeAssistErrorType.PARSE_ERROR);
    }
  }
}
