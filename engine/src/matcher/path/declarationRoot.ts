import ts from "typescript";
import { getDeclarationRoot } from "../../ast/getDeclarationRoot";
import { Context } from "../engine/Context";
import { Predicate } from "../predicate/Predicate";

/**
 * Matches the root of a (potentially complex) declaration from an inner binding
 * node.
 */
export const declarationRoot =
  (
    matcher: Predicate<
      ts.VariableDeclaration | ts.ParameterDeclaration,
      Context
    >
  ) =>
  (node: ts.Node, context: Context) => {
    const declarationRoot = getDeclarationRoot(node);

    if (declarationRoot == null) {
      return false;
    }

    return matcher(declarationRoot, context);
  };
