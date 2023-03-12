import ts from "typescript";

export const loopNodeKinds = [
  ts.SyntaxKind.DoStatement,
  ts.SyntaxKind.ForStatement,
  ts.SyntaxKind.ForOfStatement,
  ts.SyntaxKind.ForInStatement,
  ts.SyntaxKind.WhileStatement,
];

export type Loop =
  | ts.DoStatement
  | ts.ForStatement
  | ts.ForOfStatement
  | ts.ForInStatement
  | ts.WhileStatement;

export function isLoop(node: ts.Node): node is Loop {
  return loopNodeKinds.includes(node.kind);
}
