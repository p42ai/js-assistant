import * as vscode from "vscode";

export const getWorkspaceFolderRelativePath = (uri: vscode.Uri): string => {
  const path = vscode.workspace.asRelativePath(uri, false);
  return uri.path === path ? "" : path;
};
