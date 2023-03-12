import ts from "typescript";
import { isBlockLike } from "../../ast/BlockLike";
import { isStatement } from "../../ast/Statement";
import { Context } from "../engine/Context";
import { Predicate } from "../predicate/Predicate";

export const nextStatement =
  (matcher: Predicate<ts.Node, Context>) =>
  (node: ts.Node, context: Context) => {
    const { parent } = node;

    // TODO merge if statement automated refactoring
    if (!isStatement(node)) {
      return false;
    }

    if (!isBlockLike(parent)) {
      return false;
    }

    const nextStatement =
      parent.statements[parent.statements.indexOf(node) + 1];

    if (nextStatement == null) {
      return false;
    }

    return matcher(nextStatement, context);
  };
