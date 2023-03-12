import { AugmentationErrorHandler } from "../augmentation/AugmentationErrorHandler";
import { CancellationToken } from "../util/concurrency/CancellationToken";
import { PerformanceRecorder } from "../util/performance/PerformanceRecorder";
import { CodeAssist } from "./CodeAssist";
import { CodeAssistApplicationResult } from "./CodeAssistApplicationResult";
import { Content, FixedContent } from "./Content";
import { SourceDocument } from "./SourceDocument";
import { SourceDocumentFactory } from "./SourceDocumentFactory";

export type CodeAssistProvider = {
  getCodeAssists(sourceDocument: SourceDocument): Promise<Array<CodeAssist>>;
  recordApplicationResults(results: Array<CodeAssistApplicationResult>): void;
};

export const runMultiphase = async ({
  content,
  sourceDocumentFactory,
  codeAssistProvider,
  handleAugmentationError,
  performanceRecorder,
  cancellationToken,
  maxIterations = 5,
}: {
  readonly content: Content;
  readonly sourceDocumentFactory: SourceDocumentFactory;
  readonly codeAssistProvider: CodeAssistProvider;
  readonly handleAugmentationError?: AugmentationErrorHandler;
  readonly performanceRecorder?: PerformanceRecorder;
  readonly cancellationToken?: CancellationToken;
  readonly maxIterations?: number;
}): Promise<{
  content: string;
  hasChanged: boolean;
}> => {
  const originalText = await content.load();
  let currentText = originalText;
  const createResult = () => ({
    content: currentText,
    hasChanged: currentText !== originalText,
  });
  const knownTexts = new Set(currentText);

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    const sourceDocument = await sourceDocumentFactory.createSourceDocument({
      content: new FixedContent(content.path, content.extension, currentText),
      handleAugmentationError,
      performanceRecorder,
      cancellationToken,
    });

    const codeAssists: Array<CodeAssist> =
      await codeAssistProvider.getCodeAssists(sourceDocument);

    // stop when there are no more code assists to apply
    if (codeAssists.length === 0) {
      return createResult();
    }

    const result = await sourceDocument.applyCodeAssists({
      codeAssists,
    });

    codeAssistProvider.recordApplicationResults(result.applicationResults);
    currentText = sourceDocument.applyEdit(result.edit);

    // abort if this content has been seen before:
    if (knownTexts.has(currentText)) {
      return createResult();
    }

    knownTexts.add(currentText);
  }

  return createResult();
};
