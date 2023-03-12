
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
import { RemoveConsoleLogCandidate } from "./RemoveConsoleLogCandidate";

export class RemoveConsoleLogTransformation extends Transformation<RemoveConsoleLogCandidate> {
  async apply(match: RemoveConsoleLogCandidate, tree: TransformedNodeTree) {
    tree.remove(match.node);
  }

  analyzeSafety(match: RemoveConsoleLogCandidate): Safety {
    return Safety.unknown();
  }

  getSuggestion(
    match: RemoveConsoleLogCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      // TODO better text
      description: "You can remove the console.log statement.",
      shortActionLabel: "Remove",
      highlightRanges: [NodeRange.node(match.captures.propertyAccess)],
    };
  }

  getActionZones(
    match: RemoveConsoleLogCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Remove console.log", [
      {
        range: NodeRange.node(match.captures.propertyAccess),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
