import * as vscode from "vscode";
import { generateNonce } from "./generateNonce";

export class P42WebView {
  private readonly webview: vscode.Webview;
  private readonly webviewId: string;
  private readonly extensionUri: vscode.Uri;

  readonly onDidReceiveMessage;

  constructor({
    webviewId,
    webview,
    extensionUri,
  }: {
    webviewId: string;
    webview: vscode.Webview;
    extensionUri: vscode.Uri;
  }) {
    this.webviewId = webviewId;
    this.webview = webview;
    this.extensionUri = extensionUri;

    this.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };
    this.webview.html = this.createHtml();

    this.onDidReceiveMessage = this.webview.onDidReceiveMessage;
  }

  updateState(state: any) {
    this.webview.postMessage({
      type: "updateState",
      state,
    });
  }

  private getUri(...paths: string[]) {
    return this.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "webview", ...paths)
    );
  }

  private createHtml() {
    const baseCssUri = this.getUri("css", "base.css");
    const codiconsCssUri = this.getUri("css", "codicons.css");
    const diffCssUri = this.getUri("css", "diff.css");
    const webviewCssUri = this.getUri("css", `${this.webviewId}.css`);
    const scriptUri = this.getUri("dist", "webview.js");

    // Use a nonce to only allow a specific script to be run.
    const nonce = generateNonce();

    const cspSource = this.webview?.cspSource;

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${cspSource}; style-src ${cspSource}; script-src 'nonce-${nonce}';" />
    <link href="${baseCssUri}" rel="stylesheet" />
    <link href="${codiconsCssUri}" rel="stylesheet" />
    <link href="${diffCssUri}" rel="stylesheet" />
    <link href="${webviewCssUri}" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>P42</title>
  </head>
  <body>
    <div id="root" />
    <script nonce="${nonce}" src="${scriptUri}" data-webview-id="${this.webviewId}" />
  </body>
</html>`;
  }
}
