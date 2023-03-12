import ts from "typescript";
import { OnDemandAugmentation } from "../OnDemandAugmentation";

/**
 * Parent AST node when ignoring parentheses.
 */
export const TrueParentAugmentation = new OnDemandAugmentation<ts.Node>({
  id: "true-parent",
  computeValue: (node: ts.Node) => {
    let { parent } = node;
    while (parent != null && ts.isParenthesizedExpression(parent)) {
      parent = parent.parent;
    }
    return parent;
  },
});
