import ts from "typescript";
import * as CodeAssistLevel from "./CodeAssistLevel";
import { AnyMatch } from "../matcher/engine/Match";
import { Safety } from "../transformation/safety/Safety";
import { Range } from "../util/text/Range";
import { CodeAssistType } from "./CodeAssistType";

/**
 * A code assist is a potential semantic action that the user can execute
 * to make a change to to the codebase.
 *
 * A code assist that is calculated for a specific position or selection
 * and shown in context menus.
 */
export type CodeAssist = {
  /**
   * Identifier for the suggestion inside a source document (fixed text).
   * Suggestions from different documents could share the same id.
   *
   * Format: `embeddedSourceId:codeAssistTypeId:matchNodeId:transformationId`
   */
  readonly id: string;

  /**
   * Action label that is shown in the context menu entry.
   */
  readonly label: string;

  readonly type: CodeAssistType<AnyMatch>;

  readonly safety: Safety;

  readonly level: CodeAssistLevel.CodeAssistLevel;

  /**
   * Code action kind
   */
  readonly kind: string;
};

/**
 * Suggested code assist. Shown in the suggestion sidebar and as suggestions in the editor.
 */
export type SuggestedCodeAssist = CodeAssist & {
  readonly level: typeof CodeAssistLevel.Suggestion;

  /**
   * Longer description that is displayed in the side-panel.
   */
  readonly description: string;

  /**
   * Short action label (e.g. "Convert") that is displayed instead of a generic "Apply" label.
   * When actionLabel is undefined, "Apply" is used.
   */
  readonly shortActionLabel: string | undefined;

  /**
   * Line number of the start of the suggestion inside the source document.
   * Line numbers start at 0.
   */
  readonly primaryLineCharacterRange: {
    start: ts.LineAndCharacter;
    end: ts.LineAndCharacter;
  };

  /**
   * Text ranges on which indications should be shown inside the editor, e.g.
   * in the form of underlines, when the code assist is suggested.
   *
   * In VS Code, these indications are provided using diagnostics.
   */
  readonly suggestionRanges: Array<Range>;

  /**
   * Text ranges which should be highlighted when the user hovers over a suggestion
   * in the side panel.
   */
  readonly highlightRanges: Array<Range>;
};
