import * as p42 from "@p42/engine";
import * as vscode from "vscode";
import { EditorActionExecutor } from "./EditorActionExecutor";

export class RenameExecutor extends EditorActionExecutor<p42.RenameAction> {
  constructor() {
    super("RENAME");
  }

  async execute(
    textEditor: vscode.TextEditor,
    action: p42.RenameAction
  ): Promise<void> {
    const startOfIdentifier = textEditor.document.positionAt(action.position);

    textEditor.selection = new vscode.Selection(
      startOfIdentifier,
      startOfIdentifier
    );

    await vscode.commands.executeCommand("editor.action.rename");
  }
}
