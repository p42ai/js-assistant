
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
import { MergeNestedElseIfCandidate } from "./MergeNestedElseIfCandidate";

export class MergeNestedElseIfTransformation extends Transformation<MergeNestedElseIfCandidate> {
  async apply(match: MergeNestedElseIfCandidate, tree: TransformedNodeTree) {
    tree.replace(
      match.node.elseStatement!,
      tree.markOriginalNode(match.captures.innerIf)
    );
  }

  analyzeSafety(match: MergeNestedElseIfCandidate) {
    return Safety.safe();
  }

  getSuggestion(
    match: MergeNestedElseIfCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: "You can merge the nested if statement into an else-if.",
      shortActionLabel: "Merge",
      highlightRanges: [
        NodeRange.ifStatementElseKeyword(match.node),
        NodeRange.ifStatementHead(match.captures.innerIf),
      ],
    };
  }

  getActionZones(
    match: MergeNestedElseIfCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Merge into else-if", [
      {
        range: NodeRange.ifStatementIfKeyword(match.captures.innerIf),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      {
        range: NodeRange.ifStatementElseKeyword(match.node),
      },
    ]);
  }
}
