
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
import { RemoveUnnecessaryExpressionStatementCandidate } from "./RemoveUnnecessaryExpressionStatementCandidate";

export class RemoveUnnecessaryExpressionStatementTransformation extends Transformation<RemoveUnnecessaryExpressionStatementCandidate> {
  async apply(
    match: RemoveUnnecessaryExpressionStatementCandidate,
    tree: TransformedNodeTree
  ) {
    tree.remove(match.node);
  }

  analyzeSafety(match: RemoveUnnecessaryExpressionStatementCandidate): Safety {
    return Safety.safe();
  }

  getSuggestion(
    match: RemoveUnnecessaryExpressionStatementCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can remove an unnecessary expression statement that has no side-effects.`,
      shortActionLabel: "Remove",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: RemoveUnnecessaryExpressionStatementCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Remove unnecessary expression statement", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
