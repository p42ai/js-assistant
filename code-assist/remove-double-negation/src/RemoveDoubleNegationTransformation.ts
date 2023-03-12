
import {
  ActionZone,
  CodeAssistLevel,
  Condition,
  createActionZones,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { RemoveDoubleNegationMatch } from "./RemoveDoubleNegationMatch";

export class RemoveDoubleNegationTransformation extends Transformation<RemoveDoubleNegationMatch> {
  async apply(match: RemoveDoubleNegationMatch, tree: TransformedNodeTree) {
    tree.replace(match.node, match.captures.expression);
  }

  analyzeSafety(match: RemoveDoubleNegationMatch): Safety {
    const messages = new SafetyMessageList();

    if (
      !Condition.isCondition(match.node, match.context) &&
      !match.data.isBooleanExpression
    ) {
      messages.warning("removes conversion to boolean");
    }

    return messages.produceSafe();
  }

  getSuggestion(
    match: RemoveDoubleNegationMatch,
    safety: Safety
  ): Suggestion | null {
    if (!safety.isSafe()) {
      return null;
    }

    return {
      description: "You can remove the double negation.",
      shortActionLabel: "Remove",
      highlightRanges: [match.getDoubleNegationRange()],
    };
  }

  getActionZones(
    match: RemoveDoubleNegationMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Remove !!", [
      {
        range: match.getDoubleNegationRange(),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
