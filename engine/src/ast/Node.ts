import ts from "typescript";
import { findIdentifierPatternContainer } from "./findIdentifierPatternContainer";
import { isSyntaxKind } from "./getSyntaxKindLabel";

export const isNode = (object: any): object is ts.Node =>
  isSyntaxKind(object.kind);

/**
 * @returns true if the modifier is set on the node.
 */
export const hasModifier = (
  node: {
    modifiers?: ts.NodeArray<ts.ModifierLike> | undefined;
  },
  modifierKind: ts.ModifierSyntaxKind
): boolean =>
  node.modifiers?.some((nodeModifier) => nodeModifier.kind === modifierKind) ??
  false;

// TODO: which nodes can be declared?
export const isDeclared = (node: ts.VariableStatement): boolean =>
  hasModifier(node, ts.SyntaxKind.DeclareKeyword);

export const isExported = (
  node:
    | ts.VariableStatement
    | ts.FunctionDeclaration
    | ts.ClassDeclaration
    | ts.VariableDeclarationList
    | ts.VariableDeclaration
    | ts.Identifier
): boolean => {
  if (ts.isIdentifier(node)) {
    const container = findIdentifierPatternContainer(node);

    if (
      !ts.isVariableDeclaration(container.parent) ||
      container !== container.parent.name
    ) {
      return false;
    }

    node = container.parent;
  }

  if (ts.isVariableDeclaration(node)) {
    if (!ts.isVariableDeclarationList(node.parent)) {
      return false;
    }
    node = node.parent;
  }

  if (ts.isVariableDeclarationList(node)) {
    if (!ts.isVariableStatement(node.parent)) {
      return false;
    }
    node = node.parent;
  }

  return hasModifier(node, ts.SyntaxKind.ExportKeyword);
};

/**
 * @returns Distance from the root of the sourcefile. Sourcefile itself
 *          has distance 0.
 */
export const getLevel = (node: ts.Node): number => {
  let counter = 0;
  while (node.parent != null) {
    node = node.parent;
    counter++;
  }
  return counter;
};
