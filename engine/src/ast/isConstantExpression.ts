import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { isSideEffectFree } from "./isSideEffectFree";

/**
 * Returns `true` if an expression is constant, i.e. not affected by changes of the program state.
 */
export const isConstantExpression = (
  expression: ts.Expression,
  context: Context
): boolean => isSideEffectFree(expression, context, true);
