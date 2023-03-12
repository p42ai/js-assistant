import ts from "typescript";
import { matchIdentifier } from "../matcher/ast/matchIdentifier";
import { matchThisExpression } from "../matcher/ast/matchThisExpression";
import { Context } from "../matcher/engine/Context";
import { Predicate } from "../matcher/predicate";
import { getFirstAncestorOrSelfOfKind } from "./getFirstAncestor";

export type ThisScopeNode =
  | ts.ConstructorDeclaration
  | ts.FunctionDeclaration
  | ts.FunctionExpression
  | ts.GetAccessorDeclaration
  | ts.MethodDeclaration
  | ts.SetAccessorDeclaration
  | ts.ClassDeclaration
  | ts.ClassExpression
  | ts.SourceFile;

export const thisScopeNodeKinds = [
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.Constructor,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
  ts.SyntaxKind.ClassDeclaration,
  ts.SyntaxKind.ClassExpression,
  ts.SyntaxKind.SourceFile,
];

export function isThisScopeNode(node: ts.Node): node is ThisScopeNode {
  return thisScopeNodeKinds.includes(node.kind);
}

export function getThisScopeNode(node: ts.Node): ThisScopeNode {
  return getFirstAncestorOrSelfOfKind(
    node,
    thisScopeNodeKinds
  ) as ThisScopeNode;
}

export const findNodes = (
  thisScope: ts.Node,
  predicate: Predicate<ts.Node, Context>,
  context: Context
): Array<ts.Node> => {
  const references: Array<ts.Node> = [];
  const visitor = (node: ts.Node): void => {
    if (predicate(node, context)) {
      references.push(node);
    }

    if (!isThisScopeNode(node)) {
      ts.forEachChild(node, visitor);
    }
  };
  thisScope.forEachChild(visitor);
  return references;
};

export const getArgumentsReferences = (
  thisScope: ts.Node,
  context: Context
): Array<ts.Identifier> =>
  findNodes(
    thisScope,
    matchIdentifier({
      text: "arguments",
    }),
    context
  ) as Array<ts.Identifier>;

export const hasNoArgumentsReference = (thisScope: ts.Node, context: Context) =>
  getArgumentsReferences(thisScope, context).length === 0;

export const getThisReferences = (
  thisScope: ts.Node,
  context: Context
): Array<ts.ThisExpression> =>
  findNodes(
    thisScope,
    matchThisExpression(),
    context
  ) as Array<ts.ThisExpression>;

export const hasNoThisReference = (thisScope: ts.Node, context: Context) =>
  getThisReferences(thisScope, context).length === 0;

export function isThisExpression(node: ts.Node): node is ts.ThisExpression {
  return node.kind === ts.SyntaxKind.ThisKeyword;
}
