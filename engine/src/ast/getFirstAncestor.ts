import ts from "typescript";

/**
 * Returns the first parent that has a certain kind.
 * Returns 'undefined' when the root has been reached and no such parent has been found.
 */
export const getFirstAncestorOrSelfOfKind = (
  node: ts.Node,
  kinds: Array<ts.SyntaxKind>
): ts.Node | undefined =>
  getFirstAncestor(node, (currentNode) => kinds.includes(currentNode.kind));

export function getFirstAncestor(
  node: ts.Node,
  predicate: (node: ts.Node) => boolean
): ts.Node | undefined {
  let currentNode: ts.Node | undefined = node;
  while (currentNode !== undefined && !predicate(currentNode)) {
    currentNode = currentNode.parent;
  }
  return currentNode;
}
