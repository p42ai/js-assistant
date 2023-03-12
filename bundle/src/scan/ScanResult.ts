import { SafetyLevel } from "@p42/engine";

export type RefactoringError = {
  type: "error"; // needed for kotlin serialization
  path: string;
  errorType: string;
  refactoring?: string | undefined;
  message: string;
};

export type RefactoringSuggestion = {
  type: "suggestion"; // needed for kotlin serialization
  path: string;
  refactoring: string;
  message: string;
  safetyLevel: SafetyLevel;
  safetyMessage?: string | undefined;
  replacementText: string;
  diff: string;
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
};

export type ScanLog = {
  type: "log"; // needed for kotlin serialization
  message: string;
};

export type ScanStatistics = {
  type: "scanStatistics"; // needed for kotlin serialization
  suggestionCount: number;
};

export type FileStatistics = {
  type: "fileStatistics"; // needed for kotlin serialization
  path: string;
  linesOfCode: number | undefined; // can be undefined if there is e.g. an error
};

export type ScanResult =
  | RefactoringError
  | RefactoringSuggestion
  | ScanLog
  | ScanStatistics
  | FileStatistics;
