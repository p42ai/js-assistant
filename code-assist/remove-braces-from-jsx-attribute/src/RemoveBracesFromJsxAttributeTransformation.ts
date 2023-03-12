
import {
  ActionZone,
  createActionZones,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { RemoveBracesFromJsxAttributeCandidate } from "./RemoveBracesFromJsxAttributeCandidate";

export class RemoveBracesFromJsxAttributeTransformation extends Transformation<RemoveBracesFromJsxAttributeCandidate> {
  async apply(
    match: RemoveBracesFromJsxAttributeCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(match.node.initializer!, match.captures.value);
  }

  analyzeSafety(match: RemoveBracesFromJsxAttributeCandidate): Safety {
    return Safety.safe();
  }

  getActionZones(
    match: RemoveBracesFromJsxAttributeCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      "Remove {…} from JSX attribute",
      [
        {
          range: NodeRange.node(match.node),
        },
      ]
    );
  }
}
