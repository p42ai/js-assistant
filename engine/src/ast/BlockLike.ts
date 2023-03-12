import ts from "typescript";

export const BLOCK_LIKE_SYNTAX_KINDS = [
  ts.SyntaxKind.Block,
  ts.SyntaxKind.SourceFile,
  ts.SyntaxKind.ModuleBlock,
  ts.SyntaxKind.CaseClause,
  ts.SyntaxKind.DefaultClause,
];

export const isBlockLike = (node: ts.Node): node is ts.BlockLike =>
  BLOCK_LIKE_SYNTAX_KINDS.includes(node.kind);
