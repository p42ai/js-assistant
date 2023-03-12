import { SerializedSuggestionCodeAssist } from "@p42/app-vscode-shared/build/code-assist/SerializedSuggestionCodeAssist";
import * as vscode from "vscode";
import { executeCodeAssistCommand } from "../../command/CodeAssistCommand";
import { DocumentWatcher } from "../../content/DocumentWatcher";
import { LanguageServerFacade } from "../../language-service-client/LanguageServerFacade";
import { getSideColumn } from "../../util/editor/getSideColumn";
import { convertOffsetRangeToVscodeRange } from "../../util/text/convertOffsetRangeToVscodeRange";
import { P42WebView } from "../../webview/P42WebView";

export class ScanResultEditor implements vscode.Disposable {
  private readonly webview: P42WebView;
  private readonly documentWatcher: DocumentWatcher;
  private readonly panel: vscode.WebviewPanel;
  private readonly decoration: vscode.TextEditorDecorationType;
  private readonly disposables: Array<vscode.Disposable> = [];

  private selectedElementId: string | undefined = undefined;

  static async create(configuration: {
    languageServer: LanguageServerFacade;
    extensionUri: vscode.Uri;
    documentUri: vscode.Uri;
  }) {
    const editor = new ScanResultEditor(configuration);
    await editor.update();
    return editor;
  }

  constructor({
    languageServer,
    extensionUri,
    documentUri,
  }: {
    languageServer: LanguageServerFacade;
    extensionUri: vscode.Uri;
    documentUri: vscode.Uri;
  }) {
    const fileName = documentUri.path.substring(
      documentUri.path.lastIndexOf("/") + 1
    );

    this.decoration = vscode.window.createTextEditorDecorationType({
      border: "1px dashed rgb(255, 76, 48)",
      backgroundColor: "rgba(255, 76, 48, 0.2)",
    });

    this.panel = vscode.window.createWebviewPanel(
      "p42-scan",
      `${fileName} - P42`,
      vscode.ViewColumn.Beside,
      {}
    );

    this.panel.onDidDispose(() => {
      this.dispose();
    });

    this.panel.iconPath = vscode.Uri.joinPath(
      extensionUri,
      "image",
      "p42-icon.png"
    );

    this.webview = new P42WebView({
      webviewId: "file-scan",
      webview: this.panel.webview,
      extensionUri,
    });

    this.disposables.push(
      this.webview.onDidReceiveMessage(async (message) => {
        const type = message.type as string;

        switch (type) {
          case "onCodeAssistSelection": {
            const suggestion: SerializedSuggestionCodeAssist =
              message.codeAssist;

            // open document to ensure active editor is correct for the action:
            const textEditor = await this.activateDocumentEditor();

            if (textEditor == null) {
              return;
            }

            const range = convertOffsetRangeToVscodeRange(
              suggestion.highlightRanges[0],
              textEditor.document
            );

            textEditor.revealRange(range);
            textEditor.selection = new vscode.Selection(range.start, range.end);

            this.showHighlight(suggestion);
            this.selectedElementId = suggestion.id;
            this.update();

            break;
          }
          case "highlightCodeAssist": {
            this.showHighlight(message.codeAssist);
            break;
          }
          case "clearCodeAssistHighlights": {
            this.clearHighlights();
            break;
          }
          case "executeCodeAssistAction": {
            this.clearHighlights();

            // open document to ensure active editor is correct for the action:
            await this.activateDocumentEditor();

            // runs async:
            executeCodeAssistCommand(message.codeAssist.id, "scanFile");
            break;
          }
          case "applySafeSuggestions": {
            // open document to ensure active editor is correct for the action:
            await this.activateDocumentEditor();

            // TODO potential bug: editor switching while this runs
            await vscode.commands.executeCommand(
              "p42.applySafeSuggestions",
              documentUri
            );
            break;
          }
        }
      })
    );

    this.documentWatcher = new DocumentWatcher(languageServer);
    this.documentWatcher.setDocumentUri(documentUri);

    this.disposables.push(
      this.documentWatcher.onSuggestionChange(this.update.bind(this))
    );
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  private get documentUri() {
    return this.documentWatcher.getDocumentUri();
  }

  private async activateDocumentEditor() {
    const documentUri = this.documentUri;

    if (documentUri == null) {
      return;
    }

    return vscode.window.showTextDocument(documentUri, {
      viewColumn: getSideColumn(this.panel.viewColumn),
    });
  }

  private showHighlight(suggestion: SerializedSuggestionCodeAssist) {
    const textEditor = this.findVisibleEditor();
    if (textEditor == null) {
      return;
    }

    textEditor.setDecorations(
      this.decoration,
      suggestion.highlightRanges.map((range) =>
        convertOffsetRangeToVscodeRange(range, textEditor.document)
      )
    );
  }

  private clearHighlights() {
    this.findVisibleEditor()?.setDecorations(this.decoration, []);
  }

  private findVisibleEditor() {
    return vscode.window.visibleTextEditors.find(
      (editor) =>
        editor.document.uri.toString() === this.documentUri?.toString()
    );
  }

  private async getSelectedElementDiff() {
    return this.selectedElementId != null
      ? await this.documentWatcher.getCodeAssistDiff(this.selectedElementId, 1)
      : undefined;
  }

  private async update() {
    this.webview.updateState({
      suggestions: await this.documentWatcher.getSuggestions(),
      selectedElementId: this.selectedElementId,
      selectedElementDiff: await this.getSelectedElementDiff(),
    });
  }
}
