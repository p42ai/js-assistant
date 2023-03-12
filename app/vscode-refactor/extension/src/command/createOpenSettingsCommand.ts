import * as vscode from "vscode";

export const createOpenSettingsCommand = () => async () => {
  vscode.commands.executeCommand("workbench.action.openSettings", "P42:");
};
