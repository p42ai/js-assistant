import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
} from "vscode-languageclient/browser";
import { LanguageServerClient } from "./LanguageServerClient";

export class BrowserLanguageServerClient implements LanguageServerClient {
  client: LanguageClient | undefined;

  private disposable: vscode.Disposable | undefined;

  private worker: Worker | undefined;

  constructor(private readonly extensionUri: vscode.Uri) {}

  dispose() {
    this.disposable?.dispose();
    this.worker?.terminate();
  }

  async init(clientOptions: LanguageClientOptions) {
    this.worker = new Worker(
      vscode.Uri.joinPath(
        this.extensionUri,
        "server/dist/server-browser.js"
      ).toString()
    );

    this.client = new LanguageClient(
      "p42.server.browser",
      "P42 JS Assistant Server",
      clientOptions,
      this.worker
    );

    this.disposable = this.client.start();

    await this.client.onReady();

    return this;
  }
}
