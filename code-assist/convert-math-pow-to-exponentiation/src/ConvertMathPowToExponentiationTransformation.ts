import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertMathPowToExponentiationCandidate } from "./ConvertMathPowToExponentiationCandidate";

export class ConvertMathPowToExponentiationTransformation extends Transformation<ConvertMathPowToExponentiationCandidate> {
  async apply(
    match: ConvertMathPowToExponentiationCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(
      match.node,
      tree.createBinaryExpression({
        left: match.captures.base,
        operator: ts.SyntaxKind.AsteriskAsteriskToken,
        right: match.captures.exponent,
      })
    );
  }

  analyzeSafety(match: ConvertMathPowToExponentiationCandidate) {
    return Safety.safe();
  }

  getSuggestion(
    match: ConvertMathPowToExponentiationCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: "You can use the exponentiation operator '**'.",
      shortActionLabel: "Convert",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: ConvertMathPowToExponentiationCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Use exponentiation operator **", [
      {
        range: NodeRange.node(match.node.expression),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      {
        range: NodeRange.node(match.node),
      },
    ]);
  }
}
