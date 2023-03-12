import * as vscode from "vscode";

export const getWorkspaceFolderFromUriString = (
  workspaceFolderUri: string
): vscode.WorkspaceFolder => {
  const uri = vscode.Uri.parse(workspaceFolderUri, true);
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
  if (workspaceFolder == null) {
    throw new Error(
      `cannot resolve workspace folder for uri '${workspaceFolderUri}'`
    );
  }
  return workspaceFolder;
};
