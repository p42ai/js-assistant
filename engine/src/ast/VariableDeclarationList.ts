import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { isInsideFunctionScope } from "./isInsideFunctionScope";
import * as VariableDeclarationKind from "./VariableDeclarationKind";

export const getVariableDeclarationKind = (
  declarationList: ts.VariableDeclarationList
): VariableDeclarationKind.VariableDeclarationKind => {
  const { flags } = declarationList;

  if (flags & ts.NodeFlags.Const) {
    return VariableDeclarationKind.Const;
  }

  if (flags & ts.NodeFlags.Let) {
    return VariableDeclarationKind.Let;
  }

  return VariableDeclarationKind.Var;
};

export const getVariableDeclarationKindKeyword = (
  declarationList: ts.VariableDeclarationList
): VariableDeclarationKind.VariableDeclarationKind["keyword"] =>
  getVariableDeclarationKind(declarationList).keyword;

export const isVar = (declarationList: ts.VariableDeclarationList): boolean =>
  !(declarationList.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const));

export const hasExactlyOneDeclaration = (
  declarationList: ts.VariableDeclarationList
): boolean => declarationList.declarations.length === 1;

// TODO move into Global?
export const isGlobalVarDeclarationList = (
  node: ts.VariableDeclarationList,
  context: Context
): boolean =>
  VariableDeclarationKind.isVarDeclarationList(node) &&
  context.scriptMetadata.isVarGlobal &&
  !isInsideFunctionScope(node);

export const isSingleDeclarationList = (
  list: ts.VariableDeclarationList
): boolean => list.declarations.length === 1;
