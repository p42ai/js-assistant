import ts, { isReturnStatement } from "typescript";

export const functionLikeNodeKinds = [
  ts.SyntaxKind.ArrowFunction,
  ts.SyntaxKind.Constructor,
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.SetAccessor,
];

export type FunctionLike =
  | ts.ArrowFunction
  | ts.ConstructorDeclaration
  | ts.FunctionDeclaration
  | ts.FunctionExpression
  | ts.GetAccessorDeclaration
  | ts.MethodDeclaration
  | ts.SetAccessorDeclaration;

/**
 * Checks if the node is function like, i.e. is a function and can contain
 * return statements.
 */
export function isFunctionLike(node: ts.Node): node is FunctionLike {
  return functionLikeNodeKinds.includes(node.kind);
}

export function findReturnStatements(
  body: ts.Statement
): Array<ts.ReturnStatement> {
  if (!ts.isBlock(body)) {
    return [];
  }

  // TODO use and extract more efficient algorithm that only searches over statements
  // (but recurses correctly into e.g. loops, if statements, etc.)
  const returnStatements: Array<ts.ReturnStatement> = [];
  body.forEachChild(function visitor(child: ts.Node) {
    // do not search in nested functions:
    if (isFunctionLike(child)) {
      return;
    }

    if (isReturnStatement(child)) {
      returnStatements.push(child);
    }

    child.forEachChild(visitor);
  });

  return returnStatements;
}
