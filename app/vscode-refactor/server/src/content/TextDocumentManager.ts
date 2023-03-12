import * as LanguageIds from "@p42/app-vscode-shared/build/content/LanguageIds";
import { Logger } from "@p42/app-vscode-shared/build/logger/Logger";
import { Disposable } from "@p42/app-vscode-shared/build/util/Disposable";
import { AsyncListenerSet } from "@p42/app-vscode-shared/build/util/notification/AsyncListenerSet";
import {
  Connection,
  TextDocumentChangeEvent,
  TextDocuments,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { createSafeSupportedUriHandler } from "../util/createSafeSupportedUriHandler";
import { TextDocumentContent } from "./TextDocumentContent";
import { Workspace } from "./Workspace";

export type TextDocumentManagerListener = (
  documentUri: string
) => Promise<void>;

export class TextDocumentManager {
  private readonly listeners = new AsyncListenerSet<
    string,
    TextDocumentManagerListener
  >();

  private readonly documents = new TextDocuments(TextDocument);

  constructor(logger: Logger, private readonly workspace: Workspace) {
    const notifyListenersSafely = createSafeSupportedUriHandler(
      "text document processing failed",
      logger,
      workspace,
      (uri) => this.listeners.notify(uri)
    );

    const handleEvent = (event: TextDocumentChangeEvent<TextDocument>) =>
      notifyListenersSafely(event.document.uri);

    this.documents.onDidChangeContent(handleEvent);
    this.documents.onDidClose(handleEvent);
  }

  listen(connection: Connection) {
    this.documents.listen(connection);
  }

  getDocument(documentUri: string): TextDocument | undefined {
    return this.documents.get(documentUri);
  }

  onTextDocumentChanged(listener: TextDocumentManagerListener): Disposable {
    return this.listeners.add(listener);
  }

  async getContent(
    documentUri: string
  ): Promise<TextDocumentContent | undefined> {
    const document = this.getDocument(documentUri);

    if (document == null) {
      return undefined;
    }

    const path = await this.workspace.asRelativePath(documentUri);
    const extension = LanguageIds.getExtension(path, document.languageId);

    if (extension == null) {
      return undefined; // cannot resolve to supported extension
    }

    return new TextDocumentContent(path, extension, document);
  }

  getUris() {
    return this.documents.keys();
  }
}
