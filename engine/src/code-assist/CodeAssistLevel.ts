export type CodeAssistLevel = 0 | 1 | 2 | 3;

export type CodeAssistLevelString =
  | "suggestion"
  | "preferredQuickFix"
  | "quickFix"
  | "regular";

export const Regular: CodeAssistLevel = 0;

export const QuickFix: CodeAssistLevel = 1;

export const PreferredQuickFix: CodeAssistLevel = 2;

export const Suggestion: CodeAssistLevel = 3;

export function isQuickFix(level: CodeAssistLevel) {
  // TODO performance: use bit map (3 bits)
  return (
    level === QuickFix || level === PreferredQuickFix || level === Suggestion
  );
}

export function isPreferred(level: CodeAssistLevel) {
  // TODO performance: use bit map (3 bits)
  return level === PreferredQuickFix || level === Suggestion;
}

export function getSuggestionOrQuickFix(isSuggestion: boolean) {
  return isSuggestion ? Suggestion : QuickFix;
}

export const codeAssistLevelToString = new Map<
  CodeAssistLevel,
  CodeAssistLevelString
>([
  [Regular, "regular"],
  [QuickFix, "quickFix"],
  [PreferredQuickFix, "preferredQuickFix"],
  [Suggestion, "suggestion"],
]);
