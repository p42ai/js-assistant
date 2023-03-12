import ts from "typescript";

/**
 * Searches for the correct node to remove from an AST if a node should be
 * removed, and what replacement to insert (e.g. an omitted expression for
 * array destructuring gaps).
 *
 * The removed node can be any of the node's parents. Removing the returned node
 * would leave the AST in a valid state (e.g. no empty arrays or undefined
 * nodes where there should be none).
 */
export function getRemovalNode(node: ts.Node): {
  replacedNode: ts.Node;
  replacement: null | "omittedExpression";
} {
  const { parent } = node;

  if (ts.isParenthesizedExpression(parent)) {
    return getRemovalNode(parent);
  }

  if (ts.isVariableDeclaration(parent) && parent.name === node) {
    return getRemovalNode(parent);
  }

  if (
    ts.isVariableDeclarationList(parent) &&
    parent.declarations.length === 1 &&
    parent.declarations[0] === node
  ) {
    return getRemovalNode(parent);
  }

  if (ts.isVariableStatement(parent)) {
    return getRemovalNode(parent);
  }

  if (ts.isBindingElement(parent)) {
    return getRemovalNode(parent);
  }

  if (ts.isBindingElement(node)) {
    if (ts.isArrayBindingPattern(parent)) {
      const nodeIndex = parent.elements.indexOf(node);
      if (parent.elements.length === 1 && nodeIndex === 0) {
        return getRemovalNode(parent);
      } else if (
        parent.elements.length > 1 &&
        nodeIndex < parent.elements.length - 1
      ) {
        return {
          replacedNode: node,
          replacement: "omittedExpression",
        };
      }
    } else if (ts.isObjectBindingPattern(parent)) {
      const nodeIndex = parent.elements.indexOf(node);
      if (parent.elements.length === 1 && nodeIndex === 0) {
        return getRemovalNode(parent);
      }
    }
  }

  return {
    replacedNode: node,
    replacement: null,
  };
}
