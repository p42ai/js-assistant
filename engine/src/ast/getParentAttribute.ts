import ts from "typescript";
import { forEachChildWithAttribute } from "./forEachChildWithAttribute.generated";

/**
 * Returns the attribute under which a node is linked to its parent.
 *
 * @param node
 * @param parent Optional - explicit parent can be provided if it
 *        does not match node.parent, e.g. on transformed trees.
 */
export function getParentAttribute(
  node: ts.Node,
  parent: ts.Node = node.parent
): string | undefined {
  let rootAttribute: string | undefined = undefined;
  forEachChildWithAttribute(parent, (childNode, attribute) => {
    if (childNode === node) {
      rootAttribute = attribute;
    }
  });
  return rootAttribute;
}
