import ts from "typescript";
import { getNodeChildren } from "./getNodeChildren";

/**
 * Returns all nodes that have a start <= startPosition and an end <= endPosition.
 * Sorted by node level in the syntax tree (source file first, leaf last).
 * Can be empty is the start/end is outside the sourcefile range.
 */
export const findNodesContainingRange = (
  startPosition: number,
  endPosition: number,
  sourceFile: ts.SourceFile
): Array<ts.Node> => {
  if (startPosition < 0 || sourceFile.getEnd() < endPosition) {
    return [];
  }

  const nodePath: Array<ts.Node> = [];

  function collectPathNodes(node: ts.Node) {
    nodePath.push(node);

    const children = getNodeChildren(node);
    for (const child of children) {
      if (child.getStart() > startPosition || child.getEnd() < endPosition) {
        continue;
      }
      collectPathNodes(child);
    }
  }

  collectPathNodes(sourceFile);

  return nodePath;
};
