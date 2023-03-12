
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
import { SimplifyBinaryExpressionCandidate } from "./SimplifyBinaryExpressionCandidate";

export class SimplifyBinaryExpressionTransformation extends Transformation<SimplifyBinaryExpressionCandidate> {
  async apply(
    match: SimplifyBinaryExpressionCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(match.node, match.captures.operand);
  }

  analyzeSafety(match: SimplifyBinaryExpressionCandidate): Safety {
    return isSideEffectFree(match.node, match.context)
      ? Safety.safe()
      : Safety.warning("can affect number of function or getter calls");
  }

  getSuggestion(
    match: SimplifyBinaryExpressionCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can simplify ${ts.tokenToString(
        match.node.operatorToken.kind
      )} expression with identical operands.`,
      shortActionLabel: "Simplify",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: SimplifyBinaryExpressionCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      `Simplify ${ts.tokenToString(match.node.operatorToken.kind)}`,
      [
        {
          range: NodeRange.node(match.node.operatorToken),
          level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
        },
      ]
    );
  }
}
