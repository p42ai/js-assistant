import * as p42 from "@p42/engine";

export type SerializedSuggestionCodeAssist = {
  /**
   * Lightweight reference that does not require calculating the replacement
   * text (expensive) before the actual execution of the refactoring.
   */
  id: string;

  /**
   * Id of the code assist type.
   */
  typeId: string;

  description: string;
  actionLabel: string;
  shortActionLabel: string | undefined;

  suggestionLine: number;

  safetyLevel: p42.SafetyLevel;
  safetyIcon: string | undefined;
  safetyMessage: string | undefined;

  /**
   * Text ranges that should be selected/highlighted in the editor
   * when the user selects or hovers over a suggestion.
   */
  highlightRanges: Array<p42.Range>;
};

export const serializeSuggestionCodeAssist = (
  suggestion: p42.SuggestedCodeAssist
): SerializedSuggestionCodeAssist => ({
  id: suggestion.id,
  typeId: suggestion.type.id,
  description: suggestion.description,
  actionLabel: suggestion.label,
  shortActionLabel: suggestion.shortActionLabel,
  safetyLevel: suggestion.safety.level,
  safetyIcon: suggestion.safety.icon,
  safetyMessage: suggestion.safety.message,
  suggestionLine: suggestion.primaryLineCharacterRange.start.line + 1,
  highlightRanges: suggestion.highlightRanges,
});
