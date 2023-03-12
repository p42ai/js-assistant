import * as _ from "lodash";
import * as vscode from "vscode";

export const convertSuggestionLevelToDiagnosticSeverity = (
  suggestionLevel: string | undefined
): vscode.DiagnosticSeverity | undefined => {
  switch (suggestionLevel) {
    case "hint":
      return vscode.DiagnosticSeverity.Hint;
    case "information":
      return vscode.DiagnosticSeverity.Information;
    case "warning":
      return vscode.DiagnosticSeverity.Warning;
    case "error":
      return vscode.DiagnosticSeverity.Error;
    default:
      return undefined;
  }
};
