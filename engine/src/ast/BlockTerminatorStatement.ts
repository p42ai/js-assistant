import ts from "typescript";

export function isBlockTerminator(statement: ts.Statement): boolean {
  return (
    ts.isBreakStatement(statement) ||
    ts.isReturnStatement(statement) ||
    ts.isThrowStatement(statement) ||
    ts.isContinueStatement(statement)
  );
}

export function isStatementListTerminated(
  statements: ReadonlyArray<ts.Statement>
): boolean {
  if (statements.length === 0) {
    return false;
  }

  // TODO support more possible flows, e.g. if-else, and
  // potentially use control flow analysis
  const lastStatement = statements[statements.length - 1];

  return isBlockTerminator(lastStatement);
}

export function isTerminated(statement: ts.Statement): boolean {
  return ts.isBlock(statement)
    ? isStatementListTerminated(statement.statements)
    : isBlockTerminator(statement);
}
