import * as ts from "typescript";
import { NodePath } from "../../ast/NodePath";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";

export type RenameOperation = {
  type: "RENAME";
  nodePath: NodePath;
};

export const rename = (nodePath: NodePath): RenameOperation => ({
  type: "RENAME",
  nodePath,
});

export const renameNode = (
  tree: TransformedNodeTree,
  node: ts.Node
): RenameOperation => rename(tree.getNodePath(node));
