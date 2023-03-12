import { SerializedCodeAssist } from "@p42/app-vscode-shared/build/code-assist/SerializedCodeAssist";
import { SerializedSuggestionCodeAssist } from "@p42/app-vscode-shared/build/code-assist/SerializedSuggestionCodeAssist";
import { FileConfigurationManagerChangeEvent } from "@p42/app-vscode-shared/build/configuration/file/FileConfigurationManager";
import { P42VscodeSettingsKey } from "@p42/app-vscode-shared/build/configuration/vscode/P42VscodeSettings";
import { DocumentUpdatedListener } from "@p42/app-vscode-shared/build/document/DocumentUpdatedListener";
import { Logger } from "@p42/app-vscode-shared/build/logger/Logger";
import { AsyncListenerSet } from "@p42/app-vscode-shared/build/util/notification/AsyncListenerSet";
import * as p42 from "@p42/engine";
import * as vscode from "vscode";
import { Disposable, RequestType } from "vscode-languageclient";
import { LanguageServerClient } from "./LanguageServerClient";

export class LanguageServerFacade {
  // TODO separate from language server facade
  private readonly documentUpdatedListeners = new AsyncListenerSet<
    string,
    DocumentUpdatedListener
  >();

  constructor(
    readonly client: LanguageServerClient,
    private readonly logger: Logger
  ) {}

  async init({
    outputChannel,
    documentSelector,
  }: {
    outputChannel: vscode.OutputChannel;
    documentSelector: Array<vscode.DocumentFilter>;
  }) {
    const disposable = await this.client.init({
      outputChannel,
      documentSelector: documentSelector.map((filter) => filter.language!),
      synchronize: {
        // TODO configuration syncing is deprecated
        configurationSection: P42VscodeSettingsKey,
      },
    });

    const { client } = this.client;

    client?.onRequest(
      new RequestType<string, void, void>("p42/document-updated"),
      async (documentUri) => {
        await this.documentUpdatedListeners.notify(documentUri);
      }
    );

    client?.onRequest(
      new RequestType<p42.SelectOptionRequest, string | undefined, void>(
        "p42/select-option"
      ),
      async (request) =>
        (
          await vscode.window.showQuickPick(
            request.options.map((option) => ({
              label: option.label,
              details: option.description,
              picked: option.label === request.selectedOption,
            })),
            {
              title: request.title,
            }
          )
        )?.label
    );

    return disposable;
  }

  async setConfigurationFileContent(
    event: FileConfigurationManagerChangeEvent
  ) {
    await this.client.client?.sendRequest(
      new RequestType<FileConfigurationManagerChangeEvent, void, void>(
        "p42/set-configuration-file-content"
      ),
      event
    );
  }

  async getSuggestions(
    documentUri: string
  ): Promise<Array<SerializedSuggestionCodeAssist> | undefined> {
    try {
      return this.client.client?.sendRequest(
        new RequestType<
          string,
          Array<SerializedSuggestionCodeAssist> | undefined,
          void
        >("p42/get-suggestions"),
        documentUri
      );
    } catch (error) {
      this.logger.error({
        message: "LanguageServer.getSuggestions failed",
        error,
      });
      return undefined;
    }
  }

  async getFunctionElements(
    documentUri: string
  ): Promise<Array<p42.FunctionElement> | undefined> {
    try {
      return this.client.client?.sendRequest(
        new RequestType<string, Array<p42.FunctionElement> | undefined, void>(
          "p42/get-function-elements"
        ),
        documentUri
      );
    } catch (error) {
      this.logger.error({
        message: "LanguageServer.getFunctionElements failed",
        error,
      });
      return undefined;
    }
  }

  async getCodeAssists(
    documentUri: string,
    selection: vscode.Range
  ): Promise<Array<SerializedCodeAssist> | undefined> {
    try {
      return await this.client.client?.sendRequest(
        new RequestType<
          {
            documentUri: string;
            selection: vscode.Range;
          },
          Array<SerializedCodeAssist> | undefined,
          void
        >("p42/get-code-assists"),
        {
          documentUri,
          selection,
        }
      );
    } catch (error) {
      this.logger.error({
        message: "LanguageServer.getCodeAssists failed",
        error,
      });
      return undefined;
    }
  }

  async getCodeAssistAction(
    documentUri: string,
    codeAssistId: string
  ): Promise<p42.CodeAssistAction | undefined> {
    try {
      return this.client.client?.sendRequest(
        new RequestType<
          {
            documentUri: string;
            codeAssistId: string;
          },
          p42.CodeAssistAction | undefined,
          void
        >("p42/get-code-assist-action"),
        {
          documentUri,
          codeAssistId,
        }
      );
    } catch (error) {
      this.logger.error({
        message: "LanguageServer.getCodeAssistAction failed",
        error,
      });
      return undefined;
    }
  }

  async getCodeAssistDiff(
    documentUri: string,
    codeAssistId: string,
    contextLines?: number | undefined
  ): Promise<string | undefined> {
    try {
      return this.client.client?.sendRequest(
        new RequestType<
          {
            documentUri: string;
            codeAssistId: string;
            contextLines?: number | undefined;
          },
          string | undefined,
          void
        >("p42/get-code-assist-diff"),
        {
          documentUri,
          codeAssistId,
          contextLines,
        }
      );
    } catch (error) {
      this.logger.error({
        message: "LanguageServer.getCodeAssistDiff failed",
        error,
      });
      return undefined;
    }
  }

  onDocumentUpdated(listener: DocumentUpdatedListener): Disposable {
    return this.documentUpdatedListeners.add(listener);
  }
}
