import ts from "typescript";

export function isAncestor(node: ts.Node, ancestor: ts.Node): boolean {
  let currentNode: ts.Node | undefined = node;
  while (currentNode !== undefined) {
    if (currentNode === ancestor) {
      return true;
    }
    currentNode = currentNode.parent;
  }
  return false;
}
