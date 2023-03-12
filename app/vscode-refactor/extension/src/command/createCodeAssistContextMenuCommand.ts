import * as vscode from "vscode";

export const createCodeActionContextMenuCommand =
  (args: { kind: string; apply: "never" | "ifSingle" }) => async () => {
    vscode.commands.executeCommand("editor.action.codeAction", args);
  };
