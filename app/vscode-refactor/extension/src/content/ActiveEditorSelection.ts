import * as vscode from "vscode";
import { ActiveEditor } from "./ActiveEditor";

/**
 * Selection in an active editor with supported content.
 */
export class ActiveEditorSelection {
  private activeSelection: vscode.Selection | undefined;

  private eventEmitter = new vscode.EventEmitter<
    vscode.TextEditor | undefined
  >();

  readonly onDidChange = this.eventEmitter.event;

  constructor(
    context: vscode.ExtensionContext,
    private readonly activeEditor: ActiveEditor
  ) {
    // update when selection changes
    context.subscriptions.push(
      vscode.window.onDidChangeTextEditorSelection((event) => {
        this.updateActiveSelection(event.textEditor);
      })
    );

    // update when editor changes
    this.activeEditor.onDidUpdate(({ editor }) => {
      this.updateActiveSelection(editor);
    });

    // initial update
    this.updateActiveSelection(vscode.window.activeTextEditor);
  }

  get editor() {
    return this.activeEditor.editor;
  }

  private updateActiveSelection(editor: vscode.TextEditor | undefined) {
    if (editor !== this.activeEditor.editor) {
      return;
    }

    const selection = editor?.selection;

    if (selection === this.activeSelection) {
      return;
    }

    this.activeSelection = selection;
    this.eventEmitter.fire(editor);
  }
}
