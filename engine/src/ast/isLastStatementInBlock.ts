import ts from "typescript";
import { isBlockLike } from "..";

export function isLastStatementInBlock(statement: ts.Statement): boolean {
  const { parent } = statement;

  if (!isBlockLike(parent)) {
    return false;
  }

  const { statements } = parent;

  return statements.indexOf(statement) === statements.length - 1;
}
