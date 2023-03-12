import * as ts from "typescript";
import { NodePath } from "../../ast/NodePath";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";

// TODO support different insertion positions (before/after/etc.)
export type InsertSnippetOperation = {
  type: "INSERT_SNIPPET";
  nodePath: NodePath;
  snippet: string;
};

export const insertSnippet = (
  nodePath: NodePath,
  snippet: string
): InsertSnippetOperation => ({
  type: "INSERT_SNIPPET",
  nodePath,
  snippet,
});

export const insertSnippetBeforeNode = (
  tree: TransformedNodeTree,
  node: ts.Node,
  snippet: string
): InsertSnippetOperation => insertSnippet(tree.getNodePath(node), snippet);
