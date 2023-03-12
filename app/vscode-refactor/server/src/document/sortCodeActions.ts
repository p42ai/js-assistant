import { CodeAction } from "vscode-languageserver";

export function sortCodeActions(codeActions: Array<CodeAction>) {
  codeActions.sort((codeActionA, codeActionB) =>
    codeActionA.title.localeCompare(codeActionB.title)
  );
  return codeActions;
}
