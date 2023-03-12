
import {
  ActionZone,
  createActionZones,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { ExpandSelfClosingJsxElementCandidate } from "./ExpandSelfClosingJsxElementCandidate";

export class ExpandSelfClosingJsxElementTransformation extends Transformation<ExpandSelfClosingJsxElementCandidate> {
  async apply(
    match: ExpandSelfClosingJsxElementCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(
      match.node,
      tree.createJsxElement({
        openingElement: tree.createJsxOpeningElement({
          tagName: match.node.tagName,
          attributes: match.node.attributes,
          typeArguments: match.node.typeArguments?.slice(0),
        }),
        children: [],
        closingElement: tree.createJsxClosingElement({
          tagName: match.node.tagName,
        }),
      })
    );
  }

  analyzeSafety(match: ExpandSelfClosingJsxElementCandidate): Safety {
    return Safety.safe();
  }

  getActionZones(
    match: ExpandSelfClosingJsxElementCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      "Expand tag",
      [
        {
          range: NodeRange.node(match.node),
        },
      ]
    );
  }
}
