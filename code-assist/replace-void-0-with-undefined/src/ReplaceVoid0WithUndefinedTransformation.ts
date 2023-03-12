
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
import { ReplaceVoid0WithUndefinedCandidate } from "./ReplaceVoid0WithUndefinedCandidate";

export class ReplaceVoid0WithUndefinedTransformation extends Transformation<ReplaceVoid0WithUndefinedCandidate> {
  async apply(
    match: ReplaceVoid0WithUndefinedCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(
      match.node,
      tree.createIdentifier({
        text: "undefined",
      })
    );
  }

  analyzeSafety(match: ReplaceVoid0WithUndefinedCandidate) {
    return Safety.safe();
  }

  getSuggestion(
    match: ReplaceVoid0WithUndefinedCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can replace '${match.node.getText()}' with 'undefined'.`,
      shortActionLabel: "Replace",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: ReplaceVoid0WithUndefinedCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Replace with undefined", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
