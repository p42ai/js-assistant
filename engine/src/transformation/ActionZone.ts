import * as CodeAssistLevel from "../code-assist/CodeAssistLevel";
import { isNotNull } from "../util/collection/isNotNull";
import { Range } from "../util/text/Range";

/**
 * An action zone is a range in which the user can invoke the transformation
 * as a code action (UI entry point).
 */
export interface ActionZone {
  readonly range: Range;

  /**
   * Code action kind index. Resolved per code action type.
   */
  readonly codeActionKindIndex: number;

  /**
   * The code action label is used in the UI context menus when the user
   * wants to invoke a transformation.
   */
  readonly label: string;

  readonly level: CodeAssistLevel.CodeAssistLevel;
}

export const createActionZones = (
  label: string,
  entries: Array<
    | {
        range: Range;
        level?: CodeAssistLevel.CodeAssistLevel;
      }
    | undefined
  >,
  codeActionKindIndex = 0
): Array<ActionZone> =>
  entries.filter(isNotNull).map((entry) => ({
    label,
    codeActionKindIndex,
    range: entry.range,
    level: entry.level ?? CodeAssistLevel.QuickFix,
  }));
