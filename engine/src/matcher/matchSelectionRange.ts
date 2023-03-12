import ts from "typescript";
import { trimWhitespaceFromSelection } from "../util/text/trimWhitespaceFromSelection";
import { Context } from "./engine/Context";
import * as p from "./predicate";

/**
 * Selected range must match node range (ignoring any surround whitespace).
 */
export function matchSelectionRange() {
  return p.define("matchSelectionRange", (node: ts.Node, context: Context) => {
    const selectedRange = context.selectedRange;

    if (selectedRange == null) {
      return false;
    }

    const adjustedSelection = trimWhitespaceFromSelection(
      node.getSourceFile().getFullText(),
      selectedRange
    );
    return (
      adjustedSelection.start === node.getStart() &&
      adjustedSelection.end === node.getEnd()
    );
  });
}
