
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  isSideEffectFree,
  NodeRange,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { getComparison } from "./getComparison";
import { UseEqEqNullCandidate } from "./UseEqEqNullCandidate";

export class UseEqEqNullTransformation extends Transformation<UseEqEqNullCandidate> {
  async apply(match: UseEqEqNullCandidate, tree: TransformedNodeTree) {
    tree.replace(
      match.node,
      tree.createBinaryExpression({
        left: match.captures.checkedExpression,
        operator: getComparison(match),
        right: tree.createNull(),
      })
    );
  }

  analyzeSafety(match: UseEqEqNullCandidate): Safety {
    return isSideEffectFree(match.captures.checkedExpression, match.context)
      ? Safety.safe()
      : Safety.warning("could change number of function or getter calls");
  }

  getSuggestion(
    match: UseEqEqNullCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can shorten check for 'undefined' and 'null' with '${ts.tokenToString(
        getComparison(match)
      )} null' comparison.`,
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: UseEqEqNullCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      `Convert to ${ts.tokenToString(getComparison(match))} null`,
      [
        {
          range: NodeRange.node(match.node),
          level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
        },
      ]
    );
  }
}
