import {
  ActionZone,
  createActionZones,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { AddBracesToJsxAttributeCandidate } from "./AddBracesToJsxAttributeCandidate";

export class AddBracesToJsxAttributeTransformation extends Transformation<AddBracesToJsxAttributeCandidate> {
  async apply(
    match: AddBracesToJsxAttributeCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(
      match.node.initializer!,
      tree.createJsxExpression({
        expression: match.captures.value,
      })
    );
  }

  analyzeSafety(match: AddBracesToJsxAttributeCandidate): Safety {
    return Safety.safe();
  }

  getActionZones(
    match: AddBracesToJsxAttributeCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Add {…} to JSX attribute", [
      { range: NodeRange.node(match.node) },
    ]);
  }
}
