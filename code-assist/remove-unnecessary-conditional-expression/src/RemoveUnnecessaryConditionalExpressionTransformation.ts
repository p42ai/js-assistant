
import {
  ActionZone,
  CodeAssistLevel,
  Condition,
  createActionZones,
  isSideEffectFree,
  NodeRange,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { RemoveUnnecessaryConditionalExpressionMatch } from "./RemoveUnnecessaryConditionalExpressionMatch";

export class RemoveUnnecessaryConditionalExpressionTransformation extends Transformation<RemoveUnnecessaryConditionalExpressionMatch> {
  async apply(
    match: RemoveUnnecessaryConditionalExpressionMatch,
    tree: TransformedNodeTree
  ) {
    tree.replace(match.node, match.captures.replacement);
  }

  analyzeSafety(match: RemoveUnnecessaryConditionalExpressionMatch): Safety {
    switch (match.captures.type) {
      case "same-result":
        return isSideEffectFree(match.node.condition, match.context)
          ? Safety.safe()
          : Safety.warning("removes condition that could have side-effects");
      case "condition-is-result":
        return Condition.isCondition(match.node, match.context) ||
          match.data.isBooleanCondition
          ? Safety.safe()
          : Safety.warning("removes conversion to boolean");
    }
  }

  getSuggestion(
    match: RemoveUnnecessaryConditionalExpressionMatch,
    safety: Safety
  ): Suggestion | null {
    // exclude when conversion to boolean is required:
    if (
      match.captures.type === "condition-is-result" &&
      !(
        Condition.isCondition(match.node, match.context) ||
        match.data.isBooleanCondition
      )
    ) {
      return null;
    }

    return {
      description: `You can replace the unnecessary conditional expression with its ${match.getTypeLabel()}.`,
      shortActionLabel: "Replace",
      highlightRanges: [
        NodeRange.node(match.node.condition),
        NodeRange.node(match.node.whenTrue),
        NodeRange.node(match.node.whenFalse),
      ],
    };
  }

  getActionZones(
    match: RemoveUnnecessaryConditionalExpressionMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      `Replace conditional expression with its ${match.getTypeLabel()}`,
      [
        {
          range: NodeRange.node(match.node),
          level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
        },
      ]
    );
  }
}
