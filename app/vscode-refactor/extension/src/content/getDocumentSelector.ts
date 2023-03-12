import { getSupportedLanguageIds } from "@p42/app-vscode-shared/build/content/LanguageIds";
import * as vscode from "vscode";

export const getDocumentSelector = () => {
  const documentSelector: Array<vscode.DocumentFilter> = [];
  for (const languageId of getSupportedLanguageIds()) {
    documentSelector.push({ language: languageId });
  }
  return documentSelector;
};
