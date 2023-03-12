import * as vscode from "vscode";

export function getSideColumn(
  panelViewColumn: vscode.ViewColumn | undefined
): vscode.ViewColumn | undefined {
  return panelViewColumn == null
    ? 1
    : panelViewColumn === 1
    ? 2
    : panelViewColumn - 1;
}
