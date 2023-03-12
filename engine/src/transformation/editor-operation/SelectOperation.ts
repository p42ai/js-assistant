import * as ts from "typescript";
import { Context } from "../../matcher/engine/Context";
import { Range } from "../../util/text/Range";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";
import { RelativeRange } from "./RelativeRange";

export type SelectOperation = {
  type: "SELECT";
  selections: Array<RelativeRange>;
};

export const select = (
  ...selections: Array<RelativeRange>
): SelectOperation => ({
  type: "SELECT",
  selections,
});

export const selectNodes = (
  tree: TransformedNodeTree,
  ...nodes: Array<ts.Node>
): SelectOperation =>
  select(
    ...nodes.map((node) => ({
      nodePath: tree.getNodePath(node),
      offset: new Range(0, node.end - node.getStart()),
    }))
  );

/**
 * @param capped limits the movement to the start of the node
 *               TODO also cap at end
 */
export const keepExistingSelection = (
  tree: TransformedNodeTree,
  sourceNode: ts.Node,
  targetNode: ts.Node,
  context: Context,
  capped = false
) => {
  const range = context.selectedRange;

  if (range == null) {
    return undefined;
  }

  const originalStart = sourceNode.getStart();

  const start = range.start - originalStart;
  const end = range.end - originalStart;

  return select({
    nodePath: tree.getNodePath(targetNode),
    offset: capped
      ? new Range(Math.max(0, start), Math.max(0, end))
      : new Range(start, end),
  });
};
