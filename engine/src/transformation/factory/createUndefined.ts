import ts from "typescript";
import { Scope } from "../../augmentation/scope/Scope";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";

/**
 * Return a tree node that presents "undefined" in the given scope. This can either
 * be the 'undefined' identifier or 'void 0' (when undefined is re-declared).
 */
export const createUndefined = (
  tree: TransformedNodeTree,
  scope: Scope
): ts.Identifier | ts.VoidExpression =>
  scope.isBindingDeclared("undefined")
    ? tree.createVoidExpression({
        expression: tree.createNumericLiteral({ text: "0" }),
      })
    : tree.createIdentifier({
        text: "undefined",
      });
