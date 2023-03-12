import ts from "typescript";
import { TransformedNodeTree } from "..";

export function isSingleQuote(
  node: ts.StringLiteral,
  tree: TransformedNodeTree
): boolean | undefined {
  // singleQuote is internal typescript AST property that can be set
  // on synthesized (not parsed) string literals
  return tree.isNew(node)
    ? (node as any).singleQuote
    : node.getText().startsWith("'");
}
