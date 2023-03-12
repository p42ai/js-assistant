import * as vscode from "vscode";
import { isDocumentSupported } from "./isDocumentSupported";

/**
 * Active editor with supported content.
 */
export class ActiveEditor {
  private activeEditor: vscode.TextEditor | undefined;
  private activeEditorPath: string | undefined;

  private eventEmitter = new vscode.EventEmitter<{
    editor: vscode.TextEditor | undefined;
    type: "scroll" | "editorChange";
  }>();

  /**
   * Fires when the active editor changes or its visible ranges change.
   */
  readonly onDidUpdate = this.eventEmitter.event;

  constructor(context: vscode.ExtensionContext) {
    // listen for text editor changes:
    context.subscriptions.push(
      vscode.window.onDidChangeActiveTextEditor(
        this.updateActiveEditor.bind(this)
      )
    );

    // listen for scroll changes:
    context.subscriptions.push(
      vscode.window.onDidChangeTextEditorVisibleRanges(async (event) => {
        if (event.textEditor === this.activeEditor) {
          this.eventEmitter.fire({
            editor: this.activeEditor,
            type: "scroll",
          });
        }
      })
    );

    // update with initial editor
    this.updateActiveEditor(vscode.window.activeTextEditor);
  }

  get editor() {
    return this.activeEditor;
  }

  get fileName() {
    return this.activeEditorPath;
  }

  get shortFileName() {
    return this.fileName?.substring(this.fileName?.lastIndexOf("/") + 1);
  }

  get isDocumentSupported() {
    return this.activeEditor != null;
  }

  get document() {
    return this.activeEditor?.document;
  }

  get documentUri() {
    return this.document?.uri;
  }

  private updateActiveEditor(editor: vscode.TextEditor | undefined) {
    // always update filename:
    // (note: using path here to have standardized separator)
    this.activeEditorPath = editor?.document?.uri?.path;

    editor = isDocumentSupported(editor?.document) ? editor : undefined;

    if (editor !== this.activeEditor) {
      this.activeEditor = editor;
    }

    this.eventEmitter.fire({
      editor: this.activeEditor,
      type: "editorChange",
    });
  }
}
