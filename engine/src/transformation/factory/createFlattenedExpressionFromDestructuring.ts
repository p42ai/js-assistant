import _ from "lodash";
import ts from "typescript";
import * as BindingElement from "../../ast/BindingElement";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";

export const createFlattenedExpressionFromDestructuring = ({
  bindingElement,
  baseExpression,
  tree,
}: {
  bindingElement: ts.BindingElement;
  baseExpression: ts.Expression;
  tree: TransformedNodeTree;
}) => {
  // number: array index; identifier: property name
  const propertyAccessors: Array<ts.Identifier | number> = [];
  let current: ts.Node = bindingElement;
  while (ts.isBindingElement(current)) {
    propertyAccessors.push(
      ts.isObjectBindingPattern(current.parent)
        ? BindingElement.getPropertyIdentifier(current)!
        : current.parent.elements.indexOf(current)
    );
    current = current.parent.parent;
  }

  let expression = tree.copy(baseExpression);
  for (let i = propertyAccessors.length - 1; i >= 0; i--) {
    const accessor = propertyAccessors[i];
    expression = _.isNumber(accessor)
      ? tree.createElementAccessExpression({
          expression,
          argumentExpression: tree.createNumericLiteral({
            text: accessor.toString(),
          }),
        })
      : tree.createPropertyAccessExpression({
          expression,
          name: tree.copy(accessor),
        });
  }

  return expression;
};
