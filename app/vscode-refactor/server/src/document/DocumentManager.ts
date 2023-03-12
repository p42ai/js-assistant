import { ConfigurationManager } from "@p42/app-vscode-shared/build/configuration/ConfigurationManager";
import { Logger } from "@p42/app-vscode-shared/build/logger/Logger";
import { PerformanceLoggerFactory } from "@p42/app-vscode-shared/build/logger/PerformanceLoggerFactory";
import { matchesGlobPattern } from "@p42/app-vscode-shared/build/util/fs/matchesGlobPattern";
import * as p42 from "@p42/engine";
import * as _ from "lodash";
import {
  CodeAction,
  CodeActionContext,
  Diagnostic,
  Range,
} from "vscode-languageserver";
import { TextDocumentManager } from "../content/TextDocumentManager";
import { Workspace } from "../content/Workspace";
import { Document } from "./Document";
import { DocumentManagerEventListener } from "./DocumentManagerEventListener";

export class DocumentManager {
  private readonly documents = new Map<string, Document>();

  private readonly eventListeners: Array<DocumentManagerEventListener> = [];

  private readonly sourceDocumentFactory: p42.SourceDocumentFactory;
  private readonly documentManager: TextDocumentManager;
  private readonly logger: Logger;
  private readonly configurationManager: ConfigurationManager;
  private readonly workspace: Workspace;
  private readonly performanceLoggerFactory: PerformanceLoggerFactory;
  private readonly sendDiagnostics: (
    documentUri: string,
    diagnostics: Diagnostic[] | undefined
  ) => void;
  private readonly interactiveInput: p42.InteractiveInput;

  constructor({
    sourceDocumentFactory,
    textDocumentManager,
    logger,
    configurationManager,
    workspace,
    performanceLoggerFactory,
    sendDiagnostics,
    interactiveInput,
  }: {
    sourceDocumentFactory: p42.SourceDocumentFactory;
    textDocumentManager: TextDocumentManager;
    logger: Logger;
    configurationManager: ConfigurationManager;
    workspace: Workspace;
    performanceLoggerFactory: PerformanceLoggerFactory;
    sendDiagnostics: (
      documentUri: string,
      diagnostics: Diagnostic[] | undefined
    ) => void;
    interactiveInput: p42.InteractiveInput;
  }) {
    this.sourceDocumentFactory = sourceDocumentFactory;
    this.documentManager = textDocumentManager;
    this.logger = logger;
    this.configurationManager = configurationManager;
    this.workspace = workspace;
    this.performanceLoggerFactory = performanceLoggerFactory;
    this.sendDiagnostics = sendDiagnostics;
    this.interactiveInput = interactiveInput;

    this.configurationManager.onConfigurationUpdate(async () => {
      await this.refreshAll();
    });

    this.documentManager.onTextDocumentChanged(async (uri) => {
      await this.refresh(uri, false);
    });
  }

  addEventListener(listener: DocumentManagerEventListener) {
    this.eventListeners.push(listener);
  }

  removeEventListener(listenerToRemove: DocumentManagerEventListener) {
    _.remove(this.eventListeners, (listener) => listener === listenerToRemove);
  }

  private async isExcluded(uri: string): Promise<boolean> {
    const relativePath = await this.workspace.asRelativePath(uri);

    try {
      const workspaceFolderUri = await this.workspace.getWorkspaceFolderUri(
        uri
      );
      if (workspaceFolderUri === undefined) {
        // support analysis of single files that are e.g. opened on vscode.dev
        // (they are never excluded):
        return false;
      }

      // check if the relative path is matched by any of the excluded path patterns:
      const excludedPathPatterns = (
        await this.configurationManager.getConfiguration(workspaceFolderUri)
      ).getExcludedPathPatterns();

      return matchesGlobPattern(relativePath, excludedPathPatterns);
    } catch (error) {
      // Error can e.g. happen when the p42.toml configuration for excluded paths does not
      // match the expected format.
      this.logger.error({
        path: relativePath,
        // note: include URI here because path might be empty for e.g. github diff view
        message: `could not check excluded paths for ${uri}`,
        error,
      });

      return false;
    }
  }

  async refreshAll() {
    for (const documentUri of this.documentManager.getUris()) {
      this.refresh(documentUri, true);
    }
  }

  async refresh(documentUri: string, force = false) {
    const previousDocument = this.getDocument(documentUri);
    const content = await this.documentManager.getContent(documentUri);
    const path = content?.path;

    try {
      let refresh = false;
      if (previousDocument != null) {
        // do not clear when text has not changed:
        if (previousDocument.content.text === content?.text && !force) {
          return;
        }

        // remove any existing engine to prevent race condition when calculating ad-hoc refactorings:
        this.documents.delete(documentUri);

        refresh = true;
      }

      if (content == null || (await this.isExcluded(documentUri))) {
        // Unsupported language dialect or excluded path.
        // This is handled down here to ensure existing objects (document, refactoring engine)
        // are cleaned up when the file type (language dialect) is changed.

        // notify event listener (only when document not re-calculated)
        if (refresh) {
          // TODO could this be a listener?
          this.sendDiagnostics(documentUri, undefined);

          for (const listener of this.eventListeners) {
            await listener.onDocumentCleared(documentUri);
          }
        }

        return;
      }
    } catch (error) {
      this.logger.error({
        message: "Processing file failed",
        path,
        error,
      });
      return;
    }

    // reset document
    const configuration = await this.getConfiguration(documentUri);
    const relativePath = await this.workspace.asRelativePath(documentUri);

    const document: Document = new Document(
      relativePath,
      content,
      configuration,
      this.logger,
      this.performanceLoggerFactory.createPerformanceLogger(relativePath),
      new p42.ThresholdCancellationToken(
        25, // 25ms before next delay (to not halt too often, which is slow)
        new p42.FunctionCancellationToken(
          () => !this.isCurrentDocument(documentUri, document)
        )
      )
    );

    this.documents.set(documentUri, document);

    try {
      await document.initializeSourceDocument(this.sourceDocumentFactory);
    } catch (error) {
      if (error instanceof p42.OperationCanceledException) {
        // don't delete documents (as they have been overridden by newer documents)
        document.performanceLogger.logComputationCancelled();
        return;
      }

      // refactoring engine initialization exception: when e.g. the code cannot be parsed,
      // don't show any diagnostics (reset to empty)
      this.documents.delete(documentUri);

      // TODO should document update notification be sent?
      return;
    }

    // engine is ready, calculate diagnostics:
    try {
      try {
        this.sendDiagnostics(
          documentUri,
          await document.calculateDiagnostics()
        );
      } catch (error) {
        // expected error when the document computation is cancelled
        // TODO check error type
      }

      // notify that document has been initialized:
      for (const listener of this.eventListeners) {
        document?.cancellationToken.throwIfCancellationRequested();
        await listener.onDocumentInitialized(document.uri);
      }
    } catch (error) {
      if (error instanceof p42.OperationCanceledException) {
        document.performanceLogger.logComputationCancelled();
      }
    }
  }

  private async getConfiguration(documentUri: string) {
    return this.configurationManager.getConfiguration(
      await this.workspace.getWorkspaceFolderUri(documentUri)
    );
  }

  private isCurrentDocument(uri: string, document: Document): boolean {
    return this.getDocument(uri) === document;
  }

  getDocument(documentUri: string): Document | undefined {
    return this.documents.get(documentUri);
  }

  async getSerializedSuggestions(documentUri: string) {
    return this.getDocument(documentUri)?.getSerializedSuggestions();
  }

  async getFunctionElements(
    documentUri: string
  ): Promise<Array<p42.FunctionElement> | undefined> {
    return this.getDocument(documentUri)?.getFunctionElements();
  }

  async getSerializedCodeAssists(documentUri: string, selection: Range) {
    return this.getDocument(documentUri)?.getSerializedCodeAssists(selection);
  }

  async provideCodeActions(
    documentUri: string,
    range: Range,
    context: CodeActionContext
  ): Promise<CodeAction[] | undefined> {
    return this.getDocument(documentUri)?.provideCodeActions(range, context);
  }

  async getCodeAssistAction(documentUri: string, codeAssistId: string) {
    return this.getDocument(documentUri)?.getCodeAssistAction({
      codeAssistId,
      interactiveInput: this.interactiveInput,
    });
  }

  async getCodeAssistDiff(
    documentUri: string,
    codeAssistId: string,
    contextLines?: number | undefined
  ) {
    return this.getDocument(documentUri)?.getCodeAssistDiff({
      codeAssistId,
      contextLines,
    });
  }
}
