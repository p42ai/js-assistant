import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { isAncestor } from "./isAncestor";

export const isIfStatementCondition = (
  expression: ts.Expression,
  context: Context
): boolean => {
  const parent = context.getTrueParent(expression);
  return ts.isIfStatement(parent) && isAncestor(expression, parent.expression);
};

export const isConditionalExpressionCondition = (
  expression: ts.Expression,
  context: Context
): boolean => {
  const parent = context.getTrueParent(expression);
  return (
    ts.isConditionalExpression(parent) &&
    isAncestor(expression, parent.condition)
  );
};

export const isCondition = (
  expression: ts.Expression,
  context: Context
): boolean =>
  isIfStatementCondition(expression, context) ||
  isConditionalExpressionCondition(expression, context);
