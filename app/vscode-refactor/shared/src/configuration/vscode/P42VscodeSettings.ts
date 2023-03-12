import { DiagnosticLevel } from "../../diagnostic/DiagnosticLevel";
import * as p42 from "@p42/engine";

export const P42VscodeSettingsKey = "p42";

export type SafetyAnalysisVisibility =
  | "Show safety indicator and message"
  | "Show safety indicator"
  | "Do not show safety analysis";

export type SuggestionSafety =
  | "Show all suggestions"
  | "Show only safe suggestions";

export type P42VscodeSettings = {
  // user-facing settings:
  animation:
    | {
        codeAssist: "all" | "off" | undefined;
      }
    | undefined;
  feature: {
    cloudAI: {
      enabled: boolean;
    };
  };
  logging:
    | {
        performance: p42.PerformanceLogLevel | "off" | undefined;
      }
    | undefined;
  suggestionSafety: SuggestionSafety;
  suggestionBadge:
    | "Show badge for all suggestions"
    | "Show badge only for safe suggestions"
    | "Do not show badge";
  overlappingCodeAssistVisibility:
    | "Show only P42 code assists"
    | "Show only default code assists"
    | "Show all code assists";
  refactoring: Record<
    string,
    | {
        suggestion: DiagnosticLevel;
      }
    | undefined
  >;
  safetyAnalysisVisibility: SafetyAnalysisVisibility;
  // hidden settings:
  extensionMode: "production" | "local-development" | undefined;
};
