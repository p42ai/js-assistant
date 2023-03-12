import * as p42 from "@p42/engine";
import * as vscode from "vscode";
import { EditorActionExecutor } from "./EditorActionExecutor";

export class InsertSnippetExecutor extends EditorActionExecutor<p42.InsertSnippetAction> {
  constructor() {
    super("INSERT_SNIPPET");
  }

  async execute(
    textEditor: vscode.TextEditor,
    action: p42.InsertSnippetAction
  ): Promise<void> {
    const startOfIdentifier = textEditor.document.positionAt(action.position);

    await textEditor.insertSnippet(
      new vscode.SnippetString(action.snippet),
      new vscode.Selection(startOfIdentifier, startOfIdentifier)
    );
  }
}
