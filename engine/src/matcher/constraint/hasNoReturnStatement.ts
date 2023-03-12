import ts from "typescript";
import { hasDescendant } from "../../ast/hasDescendant";
import { Context } from "../engine/Context";

// TODO exclude nested functions etc.
export const hasNoReturnStatement = (
  node:
    | ts.ArrowFunction
    | ts.FunctionDeclaration
    | ts.FunctionExpression
    | ts.MethodDeclaration,
  context: Context
): boolean =>
  !hasDescendant(node, (value) => ts.isReturnStatement(value), context);
