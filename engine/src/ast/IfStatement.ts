import ts from "typescript";

export const getElseKeyword = (
  ifStatement: ts.IfStatement
): ts.Node | undefined =>
  ifStatement
    .getChildren()
    .find((node) => node.kind === ts.SyntaxKind.ElseKeyword);

export const getElseStatements = (
  ifStatement: ts.IfStatement
): Array<ts.Statement> => {
  const { elseStatement } = ifStatement;

  return elseStatement == null
    ? []
    : ts.isBlock(elseStatement)
    ? elseStatement.statements.slice()
    : [elseStatement];
};

export const getThenStatements = (
  ifStatement: ts.IfStatement
): Array<ts.Statement> => {
  const { thenStatement } = ifStatement;
  return ts.isBlock(thenStatement)
    ? thenStatement.statements.slice()
    : [thenStatement];
};
