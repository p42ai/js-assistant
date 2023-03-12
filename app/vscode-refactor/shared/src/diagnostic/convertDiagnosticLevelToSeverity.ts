import { DiagnosticLevel } from "./DiagnosticLevel";
import * as DiagnosticSeverity from "./DiagnosticSeverity";

const diagnosticLevelToSeverity = new Map<
  DiagnosticLevel,
  DiagnosticSeverity.DiagnosticSeverity
>();
diagnosticLevelToSeverity.set("hint", DiagnosticSeverity.Hint);
diagnosticLevelToSeverity.set("information", DiagnosticSeverity.Information);
diagnosticLevelToSeverity.set("warning", DiagnosticSeverity.Warning);
diagnosticLevelToSeverity.set("error", DiagnosticSeverity.Error);

export const convertDiagnosticLevelToSeverity = (
  diagnosticLevel: DiagnosticLevel | undefined
) =>
  diagnosticLevel != null
    ? diagnosticLevelToSeverity.get(diagnosticLevel)
    : undefined;
