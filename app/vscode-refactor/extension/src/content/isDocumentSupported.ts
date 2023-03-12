import * as LanguageIds from "@p42/app-vscode-shared/build/content/LanguageIds";
import * as vscode from "vscode";

export function isDocumentSupported(
  document: vscode.TextDocument | undefined
): boolean {
  return (
    document != null &&
    LanguageIds.getExtension(
      vscode.workspace.asRelativePath(document.uri),
      document.languageId
    ) != null
  );
}
