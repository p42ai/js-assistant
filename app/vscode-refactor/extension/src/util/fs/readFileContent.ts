import * as vscode from "vscode";

export async function readFileContent(fileUri: vscode.Uri): Promise<string> {
  const readData = await vscode.workspace.fs.readFile(fileUri);
  return Buffer.from(readData).toString("utf8");
}
