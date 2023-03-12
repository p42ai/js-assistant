import * as p42 from "@p42/engine";
import * as vscode from "vscode";

export abstract class EditorActionExecutor<T extends p42.EditorAction> {
  constructor(readonly type: T["type"]) {}

  abstract execute(textEditor: vscode.TextEditor, action: T): Promise<void>;
}
