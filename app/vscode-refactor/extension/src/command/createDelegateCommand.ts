import * as vscode from "vscode";

export const createDelegateCommand =
  (commandId: string) =>
  async (...args: any[]) =>
    vscode.commands.executeCommand(commandId, ...args);
