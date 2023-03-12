import ts from "typescript";
import { isBlockLike } from "./BlockLike";

/**
 * Returns the node or the first of its parents that is a direct child of a Block-like node.
 */
export function getBlockChildParent(node: ts.Node): ts.Statement {
  let blockChild: ts.Node = node;
  while (!isBlockLike(blockChild.parent)) {
    blockChild = blockChild.parent;
  }
  return blockChild as ts.Statement;
}
