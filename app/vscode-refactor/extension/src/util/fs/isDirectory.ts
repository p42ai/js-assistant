import * as vscode from "vscode";

export async function isDirectory(uri: vscode.Uri): Promise<boolean> {
  const stat = await vscode.workspace.fs.stat(uri);
  return (stat.type & vscode.FileType.Directory) === vscode.FileType.Directory;
}
