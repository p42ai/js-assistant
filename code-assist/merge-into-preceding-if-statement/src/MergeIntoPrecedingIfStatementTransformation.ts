
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { MergeIntoPrecedingIfStatementMatch } from "./MergeIntoPrecedingIfStatementMatch";

export class MergeIntoPrecedingIfStatementTransformation extends Transformation<MergeIntoPrecedingIfStatementMatch> {
  async apply(
    match: MergeIntoPrecedingIfStatementMatch,
    tree: TransformedNodeTree
  ) {
    tree.replace(
      match.captures.targetIfStatement,
      tree.updateIfStatement(match.captures.targetIfStatement, {
        expression: tree.createBinaryExpression({
          left: match.captures.targetIfStatement.expression,
          operator: ts.SyntaxKind.BarBarToken,
          right: match.node.expression,
        }),
      })
    );

    tree.remove(match.node);
  }

  analyzeSafety(match: MergeIntoPrecedingIfStatementMatch): Safety {
    const messages = new SafetyMessageList();
    return messages.produceSafe();
  }

  getSuggestion(
    match: MergeIntoPrecedingIfStatementMatch,
    safety: Safety
  ): Suggestion | null {
    return {
      description: "You can merge this if statement into the preceding one.",
      shortActionLabel: "Merge",
      highlightRanges: [
        NodeRange.node(match.captures.targetIfStatement.expression),
        NodeRange.node(match.node.expression),
      ],
    };
  }

  getActionZones(
    match: MergeIntoPrecedingIfStatementMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Merge into preceding if-statement", [
      {
        range: NodeRange.ifStatementHead(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      {
        range: NodeRange.node(match.node),
      },
    ]);
  }
}
