
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Range,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { RemoveUnnecessaryTemplateCandidate } from "./RemoveUnnecessaryTemplateCandidate";

export class RemoveUnnecessaryTemplateTransformation extends Transformation<RemoveUnnecessaryTemplateCandidate> {
  async apply(
    match: RemoveUnnecessaryTemplateCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(match.node, match.captures.expression);
  }

  analyzeSafety(match: RemoveUnnecessaryTemplateCandidate): Safety {
    return match.data.isStringLike
      ? Safety.safe()
      : Safety.warning("might remove conversion to string");
  }

  getSuggestion(
    match: RemoveUnnecessaryTemplateCandidate,
    safety: Safety
  ): Suggestion | null {
    if (!safety.isSafe()) {
      return null;
    }

    const start = match.node.getStart();
    const { end } = match.node;

    return {
      description: `You can replace ${
        match.data.isStringLike ? "an unnecessary" : "a"
      } template literal with its inner expression.`,
      shortActionLabel: "Replace",
      highlightRanges: [new Range(start, start + 3), new Range(end - 2, end)],
    };
  }

  getActionZones(
    match: RemoveUnnecessaryTemplateCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Replace with inner expression", [
      {
        range: NodeRange.firstCharactersOfNode(match.node, 2),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      {
        range: NodeRange.node(match.node),
      },
    ]);
  }
}
