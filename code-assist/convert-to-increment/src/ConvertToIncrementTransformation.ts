
import {
  ActionZone,
  createActionZones,
  NodeRange,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
  matchers,
  Suggestion,
  CodeAssistLevel,
} from "@p42/engine";
import { ConvertToIncrementMatch } from "./ConvertToIncrementMatch";

export class ConvertToIncrementTransformation extends Transformation<ConvertToIncrementMatch> {
  async apply(match: ConvertToIncrementMatch, tree: TransformedNodeTree) {
    tree.replace(
      match.node,
      tree.createPostfixUnaryExpression({
        operand: match.captures.targetExpression,
        operator: match.unaryOperator,
      })
    );
  }

  analyzeSafety(match: ConvertToIncrementMatch): Safety {
    const messages = new SafetyMessageList();

    if (
      match.captures.type === "increment" &&
      !matchers.type.numeric(match.captures.targetExpression, match.context)
    ) {
      messages.warning("might not be numeric");
    }

    return messages.produceSafe();
  }

  getSuggestion(
    match: ConvertToIncrementMatch,
    safety: Safety
  ): Suggestion | null {
    if (!safety.isSafe()) {
      return null;
    }

    return {
      description: `You can convert an assignment into a ${match.captures.type} expression.`,
      shortActionLabel: "Convert",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: ConvertToIncrementMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(`Convert to ${match.shortType}`, [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
