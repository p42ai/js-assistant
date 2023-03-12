import * as vscode from "vscode";
import { P42WebView } from "./P42WebView";

// TODO inline into the actual views (once LicenseView is gone)
export class WebViewWrapper {
  private p42WebView: P42WebView;

  constructor(
    readonly view: vscode.WebviewView,
    webviewId: string,
    extensionUri: vscode.Uri,
    private readonly messageHandler: (data: any) => void,
    onShow: () => Promise<void>
  ) {
    this.p42WebView = new P42WebView({
      webview: view.webview,
      webviewId,
      extensionUri,
    });

    const disposable = this.p42WebView.onDidReceiveMessage(this.messageHandler);

    this.view.onDidDispose(() => {
      disposable.dispose();
    });

    this.view.onDidChangeVisibility(() => {
      if (this.view.visible) {
        onShow();
      }
    });
  }

  updateState(state: any) {
    this.p42WebView.updateState(state);
  }
}
