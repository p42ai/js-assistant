import ts from "typescript";
import { TransformedNodeTree } from "../transformation/TransformedNodeTree.generated";
import { BinaryOperator } from "./BinaryOperator";

export const getOperator = (expression: ts.BinaryExpression) =>
  BinaryOperator.get(expression.operatorToken.kind);

export const getPrecedence = (expression: ts.BinaryExpression) =>
  BinaryOperator.getPrecedence(expression.operatorToken.kind);

/**
 * Combines an array of expressions with a binary operator.
 *
 * @param expressions - The expressions to combine.
 * @param operator - The binary operator to use.
 * @param tree - The tree to create the resulting expression in.
 *
 * @returns The combined expression, or `undefined` if `expressions` is
 * empty.
 */
export function combineWithOperator(
  expressions: Array<ts.Expression>,
  operator: ts.BinaryOperator,
  tree: TransformedNodeTree
): ts.Expression | undefined {
  if (expressions.length === 0) {
    return undefined;
  }

  if (expressions.length === 1) {
    return expressions[0];
  }

  let result: ts.Expression = expressions[0];

  for (let i = 1; i < expressions.length; i++) {
    result = tree.createBinaryExpression({
      left: result,
      operator,
      right: expressions[i],
    });
  }

  return result;
}
