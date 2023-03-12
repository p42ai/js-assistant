import * as p42 from "@p42/engine";
import * as _ from "lodash";
import { convertDiagnosticLevelToSeverity } from "../diagnostic/convertDiagnosticLevelToSeverity";
import { DiagnosticLevel } from "../diagnostic/DiagnosticLevel";
import * as DiagnosticSeverity from "../diagnostic/DiagnosticSeverity";
import { FileConfiguration } from "./file/FileConfiguration";
import {
  P42VscodeSettings,
  SafetyAnalysisVisibility,
} from "./vscode/P42VscodeSettings";

export const DEFAULT_EXCLUDED_PATH_PATTERN = [
  "**/dist/**",
  "**/node_modules/**",
];

/**
 * Configuration for a workspace folder.
 *
 * Combines configuration settings from various sources (VS Code configuration, p42.toml, License Manager).
 */
export class Configuration {
  constructor(
    /**
     * Workspace folder that this configuration is for, represented by a stringified URI.
     * Null if there is not workspace folder.
     */
    readonly workspaceFolderUri: string | null,
    private readonly fileConfiguration: FileConfiguration | undefined,
    private readonly vscodeConfiguration: P42VscodeSettings
  ) {}

  isCodeAssistEnabled(
    codeAssistType: p42.CodeAssistType<p42.AnyMatch>
  ): boolean {
    return (
      codeAssistType.isEnabled() &&
      this.isCodeAssistEnabledInFileConfiguration(codeAssistType) &&
      !(
        this.areOverlappingP42CodeAssistsDisabled() &&
        this.isCodeAssistOverlapping(codeAssistType)
      ) &&
      this.isCodeAssistAvailableInEcmaScriptVersion(codeAssistType) &&
      // Cloud AI check:
      (this.vscodeConfiguration.feature.cloudAI.enabled === true ||
        codeAssistType.metadata.requiresCloudAi !== true)
    );
  }

  areSuggestionsAvailable(
    codeAssistType: p42.CodeAssistType<p42.AnyMatch>
  ): boolean {
    return (
      this.isCodeAssistEnabled(codeAssistType) &&
      codeAssistType.producesSuggestions &&
      this.getDiagnosticSeverity(codeAssistType.id) != null
    );
  }

  private isCodeAssistAvailableInEcmaScriptVersion(
    codeAssist: p42.CodeAssistType<p42.AnyMatch>
  ) {
    return p42.isEcmaScriptVersionSupported(
      codeAssist.metadata.platform?.ecmaScript,
      this.fileConfiguration?.getEcmaScriptVersion()
    );
  }

  private isCodeAssistEnabledInFileConfiguration(
    codeAssist: p42.CodeAssistType<p42.AnyMatch>
  ) {
    return this.fileConfiguration?.isCodeAssistEnabled(codeAssist.id) ?? true;
  }

  private isCodeAssistOverlapping(
    codeAssist: p42.CodeAssistType<p42.AnyMatch>
  ) {
    return codeAssist.metadata.visualStudioCode?.overlappingCodeAssist != null;
  }

  private getOverlappingCodeAssistVisibility() {
    return this.vscodeConfiguration.overlappingCodeAssistVisibility;
  }

  private areOverlappingP42CodeAssistsDisabled() {
    return (
      this.getOverlappingCodeAssistVisibility() ===
      "Show only default code assists"
    );
  }

  getDiagnosticLevel(codeAssistId: string): DiagnosticLevel | undefined {
    return this.vscodeConfiguration.refactoring[_.camelCase(codeAssistId)]
      ?.suggestion;
  }

  getDiagnosticSeverity(
    codeAssistId: string
  ): DiagnosticSeverity.DiagnosticSeverity | undefined {
    return convertDiagnosticLevelToSeverity(
      this.getDiagnosticLevel(codeAssistId)
    );
  }

  getSafetyAnalysisVisibility(): SafetyAnalysisVisibility {
    return this.vscodeConfiguration.safetyAnalysisVisibility;
  }

  areUnsafeSuggestionsEnabled(): boolean {
    return this.vscodeConfiguration.suggestionSafety === "Show all suggestions";
  }

  /**
   * Returns the exclusion glob patterns (relative to the workspace folder).
   */
  getExcludedPathPatterns(): Array<string> {
    return (
      this.fileConfiguration?.getExcludedPathPatterns() ??
      DEFAULT_EXCLUDED_PATH_PATTERN
    );
  }
}
