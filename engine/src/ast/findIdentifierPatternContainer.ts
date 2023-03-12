import ts from "typescript";

export function findIdentifierPatternContainer(
  node:
    | ts.Identifier
    | ts.ArrayBindingPattern
    | ts.ObjectBindingPattern
    | ts.ObjectLiteralExpression
    | ts.ArrayLiteralExpression
):
  | ts.Identifier
  | ts.ObjectBindingPattern
  | ts.ArrayBindingPattern
  | ts.ObjectLiteralExpression
  | ts.ArrayLiteralExpression {
  const { parent } = node;
  const grandParent = parent?.parent;

  if (ts.isArrayBindingPattern(parent) || ts.isArrayLiteralExpression(parent)) {
    return findIdentifierPatternContainer(parent);
  }

  if (
    ts.isShorthandPropertyAssignment(parent) &&
    ts.isObjectLiteralExpression(grandParent)
  ) {
    return findIdentifierPatternContainer(grandParent);
  }

  if (ts.isSpreadElement(parent) && ts.isArrayLiteralExpression(grandParent)) {
    return findIdentifierPatternContainer(grandParent);
  }

  if (
    ts.isBindingElement(parent) &&
    // the value is the actual name of the variable (vs the key referencing the origin name):
    parent.propertyName === node &&
    ts.isObjectBindingPattern(grandParent)
  ) {
    return findIdentifierPatternContainer(grandParent);
  }

  if (
    ts.isBindingElement(parent) &&
    (ts.isArrayBindingPattern(grandParent) ||
      ts.isObjectBindingPattern(grandParent))
  ) {
    return findIdentifierPatternContainer(grandParent);
  }

  return node;
}
