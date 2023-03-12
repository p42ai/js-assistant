import ts from "typescript";

/**
 * @returns Nodes from the root to the specified node.
 *          The first node is the tree root, the last child is the node.
 */
export function getPathFromRoot(node: ts.Node): ts.Node[] {
  const result: ts.Node[] = [];

  let currentNode: ts.Node | undefined = node;
  while (currentNode != null) {
    result.unshift(currentNode);
    currentNode = currentNode.parent;
  }

  return result;
}
