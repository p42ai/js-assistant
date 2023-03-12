import * as vscode from "vscode";

export const createGetStartedCommand = () => async () => {
  vscode.commands.executeCommand("workbench.action.openWalkthrough", {
    category: `p42ai.refactor#p42`,
  });
};
