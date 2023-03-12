import * as vscode from "vscode";

export function findFilesInFolder(
  folderUri: vscode.Uri,
  fileExtensions: string[]
): Thenable<vscode.Uri[]> {
  return vscode.workspace.findFiles(
    new vscode.RelativePattern(folderUri, `**/*.{${fileExtensions.join(",")}}`)
  );
}
