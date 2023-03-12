import { SerializedSuggestionCodeAssist } from "@p42/app-vscode-shared/build/code-assist/SerializedSuggestionCodeAssist";
import * as p42 from "@p42/engine";
import * as vscode from "vscode";
import { LanguageServerFacade } from "../language-service-client/LanguageServerFacade";

export class DocumentWatcher {
  private eventEmitter = new vscode.EventEmitter();
  readonly onSuggestionChange = this.eventEmitter.event;

  private documentUri: vscode.Uri | undefined = undefined;

  constructor(private readonly languageServer: LanguageServerFacade) {
    languageServer.onDocumentUpdated(async (documentUri) => {
      if (documentUri === this.documentUri?.toString()) {
        this.update();
      }
    });
  }

  getDocumentUri() {
    return this.documentUri;
  }

  setDocumentUri(documentUri: vscode.Uri | undefined) {
    this.documentUri = documentUri;
    this.update();
  }

  async getFunctionElements(): Promise<Array<p42.FunctionElement> | undefined> {
    return this.documentUri != null
      ? await this.languageServer.getFunctionElements(
          this.documentUri.toString()
        )
      : undefined;
  }

  async getSuggestions(): Promise<
    Array<SerializedSuggestionCodeAssist> | undefined
  > {
    return this.documentUri != null
      ? await this.languageServer.getSuggestions(this.documentUri.toString())
      : undefined;
  }

  async getCodeAssistDiff(
    codeAssistId: string,
    contextLines?: number | undefined
  ) {
    return this.documentUri != null
      ? await this.languageServer.getCodeAssistDiff(
          this.documentUri.toString(),
          codeAssistId,
          contextLines
        )
      : undefined;
  }

  private update() {
    this.eventEmitter.fire(undefined);
  }
}
