import ts from "typescript";
import { findIdentifierPatternContainer } from "./findIdentifierPatternContainer";

export const getDeclarationRoot = (
  node: ts.Node
): ts.ParameterDeclaration | ts.VariableDeclaration | undefined => {
  if (ts.isOmittedExpression(node)) {
    node = node.parent;
  }

  if (ts.isBindingElement(node)) {
    node = node.parent;
  }

  if (
    !ts.isIdentifier(node) &&
    !ts.isArrayBindingPattern(node) &&
    !ts.isObjectBindingPattern(node)
  ) {
    return undefined;
  }

  const containerParent = findIdentifierPatternContainer(node).parent;

  if (
    !ts.isVariableDeclaration(containerParent) &&
    !ts.isParameter(containerParent)
  ) {
    return undefined;
  }

  return containerParent;
};
