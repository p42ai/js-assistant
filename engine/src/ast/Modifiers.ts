import ts from "typescript";

type ModifierKind = ts.SyntaxKind.ExportKeyword;

type ModifierContainer = ts.FunctionExpression | ts.FunctionDeclaration;

export const Modifiers = Object.freeze({
  find(node: ModifierContainer, kind: ModifierKind) {
    return node.modifiers?.find((modifier) => modifier.kind === kind);
  },

  findExport(node: ModifierContainer) {
    return this.find(node, ts.SyntaxKind.ExportKeyword);
  },

  without(node: ModifierContainer, kind: ModifierKind) {
    return node.modifiers?.filter((modifier) => modifier.kind !== kind);
  },

  withoutExport(node: ModifierContainer) {
    return this.without(node, ts.SyntaxKind.ExportKeyword);
  },
});
