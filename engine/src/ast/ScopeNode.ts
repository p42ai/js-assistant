import ts from "typescript";
import {
  getFirstAncestor,
  getFirstAncestorOrSelfOfKind,
} from "./getFirstAncestor";

const CORE_FUNCTION_KINDS = [
  ts.SyntaxKind.ArrowFunction,
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.Constructor,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
];

export const functionScopeNodeKinds = [
  // JavaScript:
  ...CORE_FUNCTION_KINDS,
  ts.SyntaxKind.ModuleDeclaration,
  ts.SyntaxKind.SourceFile,
  // TypeScript:
  ts.SyntaxKind.CallSignature,
  ts.SyntaxKind.ConstructSignature,
  ts.SyntaxKind.ConstructorType,
  ts.SyntaxKind.FunctionType,
  ts.SyntaxKind.IndexSignature,
  ts.SyntaxKind.MethodSignature,
];

export type FunctionScopeNode =
  | ts.ArrowFunction
  | ts.ConstructorDeclaration
  | ts.FunctionDeclaration
  | ts.FunctionExpression
  | ts.GetAccessorDeclaration
  | ts.MethodDeclaration
  | ts.ModuleDeclaration
  | ts.SetAccessorDeclaration
  | ts.SourceFile
  | ts.CallSignatureDeclaration
  | ts.ConstructSignatureDeclaration
  | ts.ConstructorTypeNode
  | ts.FunctionTypeNode
  | ts.IndexSignatureDeclaration
  | ts.MethodSignature;

export function isFunctionScopeNode(node: ts.Node): node is FunctionScopeNode {
  return functionScopeNodeKinds.includes(node.kind);
}

export function getFunctionScopeNode(node: ts.Node): FunctionScopeNode {
  return getFirstAncestorOrSelfOfKind(
    node,
    functionScopeNodeKinds
  ) as FunctionScopeNode;
}

// TODO automated refactoring into [...functionScopeNodeKinds, ...]
export const scopeNodeKinds = functionScopeNodeKinds.concat(
  ts.SyntaxKind.Block,
  ts.SyntaxKind.CaseBlock,
  ts.SyntaxKind.CatchClause,
  ts.SyntaxKind.ForStatement,
  ts.SyntaxKind.ForInStatement,
  ts.SyntaxKind.ForOfStatement,
  ts.SyntaxKind.WithStatement
);

export type ScopeNode =
  | FunctionScopeNode
  | ts.Block
  | ts.CaseBlock
  | ts.CatchClause
  | ts.ForStatement
  | ts.ForInStatement
  | ts.ForOfStatement
  | ts.WithStatement;

export const isScopeNode = (node: ts.Node): node is ScopeNode => {
  const { kind } = node;

  // The scope of the outer block of functions, methods, etc. is the function scope:
  if (kind === ts.SyntaxKind.Block) {
    return !CORE_FUNCTION_KINDS.includes(node.parent.kind);
  }

  return scopeNodeKinds.includes(kind);
};

export const getScopeNode = (node: ts.Node): ScopeNode =>
  getFirstAncestor(node, isScopeNode) as ScopeNode;
