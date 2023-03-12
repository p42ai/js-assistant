import ts from "typescript";
import { Flags } from "../util/Flags";

export type VariableDeclarationKind = {
  readonly label: "let" | "var" | "const";
  readonly keyword:
    | ts.SyntaxKind.LetKeyword
    | ts.SyntaxKind.VarKeyword
    | ts.SyntaxKind.ConstKeyword;

  readonly flags: ts.NodeFlags;

  set(variableDeclarationListFlags: ts.NodeFlags): number;

  /**
   * Returns the more permissive declaration kind of the 2 kinds. The order is:
   * const < let < var
   */
  combine(other: VariableDeclarationKind): VariableDeclarationKind;
};

export const Let: VariableDeclarationKind = Object.freeze({
  label: "let",
  keyword: ts.SyntaxKind.LetKeyword,
  flags: ts.NodeFlags.Let,

  set(variableDeclarationListFlags: ts.NodeFlags): number {
    return Flags.set(
      Flags.clear(variableDeclarationListFlags, ts.NodeFlags.Const),
      ts.NodeFlags.Let
    );
  },

  combine(other: VariableDeclarationKind): VariableDeclarationKind {
    return other === Var ? other : this;
  },
});

export const Const: VariableDeclarationKind = Object.freeze({
  label: "const",
  keyword: ts.SyntaxKind.ConstKeyword,
  flags: ts.NodeFlags.Const,

  set(variableDeclarationListFlags: ts.NodeFlags): number {
    return Flags.set(
      Flags.clear(variableDeclarationListFlags, ts.NodeFlags.Let),
      ts.NodeFlags.Const
    );
  },

  combine(other: VariableDeclarationKind): VariableDeclarationKind {
    return other;
  },
});

export const Var: VariableDeclarationKind = Object.freeze({
  label: "var",
  keyword: ts.SyntaxKind.VarKeyword,
  flags: ts.NodeFlags.None,

  set(variableDeclarationListFlags: ts.NodeFlags): number {
    return Flags.clear(
      Flags.clear(variableDeclarationListFlags, ts.NodeFlags.Let),
      ts.NodeFlags.Const
    );
  },

  combine(other: VariableDeclarationKind): VariableDeclarationKind {
    return this;
  },
});

export function getVariableDeclarationKind(
  declarationList: ts.VariableDeclarationList
): VariableDeclarationKind {
  const { flags } = declarationList;

  if (flags & ts.NodeFlags.Const) {
    return Const;
  }

  if (flags & ts.NodeFlags.Let) {
    return Let;
  }

  return Var;
}

export function getVariableDeclarationKindKeyword(
  declarationList: ts.VariableDeclarationList
): VariableDeclarationKind["keyword"] {
  return getVariableDeclarationKind(declarationList).keyword;
}

export const isVarDeclarationList = (
  declarationList: ts.VariableDeclarationList
): boolean =>
  !(declarationList.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const));
