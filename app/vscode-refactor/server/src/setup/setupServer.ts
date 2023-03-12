import { SerializedCodeAssist } from "@p42/app-vscode-shared/build/code-assist/SerializedCodeAssist";
import { SerializedSuggestionCodeAssist } from "@p42/app-vscode-shared/build/code-assist/SerializedSuggestionCodeAssist";
import { ConfigurationManager } from "@p42/app-vscode-shared/build/configuration/ConfigurationManager";
import { BasicFileConfigurationManager } from "@p42/app-vscode-shared/build/configuration/file/BasicFileConfigurationManager";
import { FileConfigurationManagerChangeEvent } from "@p42/app-vscode-shared/build/configuration/file/FileConfigurationManager";
import { BasicVscodeSettingsManager } from "@p42/app-vscode-shared/build/configuration/vscode/BasicVscodeSettingsManager";
import {
  P42VscodeSettings,
  P42VscodeSettingsKey,
} from "@p42/app-vscode-shared/build/configuration/vscode/P42VscodeSettings";
import { PerformanceLoggerFactory } from "@p42/app-vscode-shared/build/logger/PerformanceLoggerFactory";
import * as bundle from "@p42/bundle";
import * as p42 from "@p42/engine";
import {
  Connection,
  InitializeResult,
  Range,
  RequestType,
  TextDocumentSyncKind,
} from "vscode-languageserver";
import { TextDocumentManager } from "../content/TextDocumentManager";
import { Workspace } from "../content/Workspace";
import { DocumentManager } from "../document/DocumentManager";
import { ConnectionLogger } from "../logger/ConnectionLogger";
import { createSafeSupportedUriHandler } from "../util/createSafeSupportedUriHandler";

export const setupServer = (connection: Connection) => {
  const logger = new ConnectionLogger(connection);

  connection.onInitialize(({ initializationOptions }): InitializeResult => {
    return {
      capabilities: {
        codeActionProvider: true,
        textDocumentSync: TextDocumentSyncKind.Incremental,
      },
    };
  });

  const vscodeSettingsManager = new BasicVscodeSettingsManager();
  connection.onDidChangeConfiguration((change) => {
    vscodeSettingsManager.setSettings(
      change.settings[P42VscodeSettingsKey] as P42VscodeSettings
    );
  });

  const fileConfigurationManager = new BasicFileConfigurationManager(logger);
  connection.onRequest(
    new RequestType<FileConfigurationManagerChangeEvent, void, void>(
      "p42/set-configuration-file-content"
    ),
    async (event) => {
      fileConfigurationManager.setContent(
        event.workspaceFolderUri,
        event.content ?? undefined
      );
    }
  );

  const configurationManager = new ConfigurationManager(
    fileConfigurationManager,
    vscodeSettingsManager
  );

  const performanceLoggerFactory = new PerformanceLoggerFactory(
    configurationManager,
    logger
  );

  const workspace = new Workspace(connection);

  const textDocumentManager = new TextDocumentManager(logger, workspace);
  textDocumentManager.listen(connection);

  const documentManager = new DocumentManager({
    sourceDocumentFactory: new p42.SourceDocumentFactory(
      bundle.AUGMENTATIONS,
      bundle.createCodeAssists()
    ),
    textDocumentManager,
    logger,
    configurationManager,
    workspace,
    performanceLoggerFactory,
    sendDiagnostics: (documentUri, diagnostics) => {
      connection.sendDiagnostics({
        uri: documentUri,
        diagnostics: diagnostics ?? [],
      });
    },
    interactiveInput: {
      async selectOption(
        request: p42.SelectOptionRequest
      ): Promise<string | undefined> {
        // try-catch to prevent server crashes
        try {
          return await connection.sendRequest(
            new RequestType<p42.SelectOptionRequest, string | undefined, void>(
              "p42/select-option"
            ),
            request
          );
        } catch (error) {
          logger.error({
            message: "p42/select-option call failed",
            error,
          });
          return undefined;
        }
      },
    },
  });

  connection.onCodeAction(async ({ textDocument, range, context }) => {
    try {
      return (
        (await documentManager.provideCodeActions(
          textDocument.uri,
          range,
          context
        )) ?? []
      );
    } catch (error) {
      logger.error({
        path: await workspace.asRelativePath(textDocument.uri),
        message: "generating code actions failed",
        error,
      });
      return [];
    }
  });

  connection.onRequest(
    new RequestType<
      string,
      Array<SerializedSuggestionCodeAssist> | undefined,
      void
    >("p42/get-suggestions"),
    createSafeSupportedUriHandler(
      "p42/get-suggestions request failed",
      logger,
      workspace,
      async (documentUri) =>
        documentManager.getSerializedSuggestions(documentUri)
    )
  );

  connection.onRequest(
    new RequestType<string, Array<p42.FunctionElement> | undefined, void>(
      "p42/get-function-elements"
    ),
    createSafeSupportedUriHandler(
      "p42/get-function-elements request failed",
      logger,
      workspace,
      async (documentUri) => documentManager.getFunctionElements(documentUri)
    )
  );

  connection.onRequest(
    new RequestType<
      {
        documentUri: string;
        selection: Range;
      },
      Array<SerializedCodeAssist> | undefined,
      void
    >("p42/get-code-assists"),
    async ({
      documentUri,
      selection,
    }): Promise<Array<SerializedCodeAssist> | undefined> => {
      // try-catch to prevent server crashes
      try {
        // need await for catch:
        return await documentManager.getSerializedCodeAssists(
          documentUri,
          selection
        );
      } catch (error) {
        logger.error({
          message: "p42/get-code-assist-action request failed",
          path: await workspace.asRelativePath(documentUri),
          error,
        });
      }
    }
  );

  connection.onRequest(
    new RequestType<
      {
        documentUri: string;
        codeAssistId: string;
      },
      p42.CodeAssistAction | undefined,
      void
    >("p42/get-code-assist-action"),
    async ({
      documentUri,
      codeAssistId,
    }): Promise<p42.CodeAssistAction | undefined> => {
      // try-catch to prevent server crashes
      try {
        // need await for catch:
        return await documentManager.getCodeAssistAction(
          documentUri,
          codeAssistId
        );
      } catch (error) {
        logger.error({
          message: "p42/get-code-assist-action request failed",
          path: await workspace.asRelativePath(documentUri),
          error,
        });
      }
    }
  );

  connection.onRequest(
    new RequestType<
      {
        documentUri: string;
        codeAssistId: string;
        contextLines?: number | undefined;
      },
      string | undefined,
      void
    >("p42/get-code-assist-diff"),
    async ({
      documentUri,
      codeAssistId,
      contextLines,
    }): Promise<string | undefined> => {
      // try-catch to prevent server crashes
      try {
        // need await for catch:
        return await documentManager.getCodeAssistDiff(
          documentUri,
          codeAssistId,
          contextLines
        );
      } catch (error) {
        logger.error({
          message: "p42/get-code-assist-diff request failed",
          path: await workspace.asRelativePath(documentUri),
          error,
        });
      }
    }
  );

  // TODO extract safe generic sendRequest
  const sendDocumentUpdated = async (documentUri: string) => {
    // try-catch to prevent server crashes
    try {
      await connection.sendRequest(
        new RequestType<string, void, void>("p42/document-updated"),
        documentUri
      );
    } catch (error) {
      logger.error({
        message: "p42/document-updated call failed",
        error,
      });
    }
  };

  documentManager.addEventListener({
    onDocumentCleared: sendDocumentUpdated,
    onDocumentInitialized: sendDocumentUpdated,
  });

  connection.listen();
};
