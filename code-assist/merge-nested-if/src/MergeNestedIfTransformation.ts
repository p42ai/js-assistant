
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
import { MergeNestedIfCandidate } from "./MergeNestedIfCandidate";

export class MergeNestedIfTransformation extends Transformation<MergeNestedIfCandidate> {
  async apply(match: MergeNestedIfCandidate, tree: TransformedNodeTree) {
    tree.replace(
      match.node,
      tree.updateIfStatement(match.node, {
        expression: tree.createBinaryExpression({
          left: match.node.expression,
          operator: ts.SyntaxKind.AmpersandAmpersandToken,
          right: match.captures.innerIf.expression,
        }),
        thenStatement: match.captures.innerIf.thenStatement,
      })
    );
  }

  analyzeSafety(match: MergeNestedIfCandidate) {
    return Safety.safe();
  }

  getSuggestion(
    match: MergeNestedIfCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description:
        "You can merge the nested 'if' condition into the outer 'if' condition using the '&&' operator.",
      shortActionLabel: "Merge",
      highlightRanges: [
        NodeRange.ifStatementHead(match.node),
        NodeRange.ifStatementHead(match.captures.innerIf),
      ],
    };
  }

  getActionZones(
    match: MergeNestedIfCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Merge nested if", [
      {
        range: NodeRange.ifStatementIfKeyword(match.captures.innerIf),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
