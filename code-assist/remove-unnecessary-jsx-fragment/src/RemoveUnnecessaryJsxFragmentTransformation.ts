
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
import { RemoveUnnecessaryJsxFragmentCandidate } from "./RemoveUnnecessaryJsxFragmentCandidate";

export class RemoveUnnecessaryJsxFragmentTransformation extends Transformation<RemoveUnnecessaryJsxFragmentCandidate> {
  async apply(
    match: RemoveUnnecessaryJsxFragmentCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(match.node, match.captures.replacement);
  }

  analyzeSafety(match: RemoveUnnecessaryJsxFragmentCandidate): Safety {
    return Safety.safe();
  }

  getSuggestion(
    match: RemoveUnnecessaryJsxFragmentCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: "You can remove an unnecessary JSX fragment.",
      shortActionLabel: "Remove",
      highlightRanges: [
        NodeRange.node(match.node.openingFragment),
        NodeRange.node(match.node.closingFragment),
      ],
    };
  }

  getActionZones(
    match: RemoveUnnecessaryJsxFragmentCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Remove fragment", [
      {
        range: NodeRange.node(match.node.openingFragment),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      {
        range: NodeRange.node(match.node.closingFragment),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
