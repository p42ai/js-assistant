import _ from "lodash";
import ts from "typescript";
import { NodePath } from "../../ast/NodePath";
import { isNotNull } from "../../util/collection/isNotNull";
import { Range } from "../../util/text/Range";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";

type NodePathRange =
  | [NodePath]
  | [NodePath, ((node: ts.Node) => Range) | undefined];

export type HighlightOperation = {
  type: "HIGHLIGHT";
  highlights: Array<NodePathRange>;
};

export const highlight = (
  ...highlights: Array<NodePathRange>
): HighlightOperation => ({
  type: "HIGHLIGHT",
  highlights,
});

export const highlightNodes = (
  tree: TransformedNodeTree,
  ...nodes: Array<
    | ts.Node
    | [ts.Node, (node: ts.Node) => Range]
    | { nodePath: NodePath; f: (node: ts.Node) => Range }
    | undefined
  >
): HighlightOperation =>
  highlight(
    ...nodes
      .filter(isNotNull)
      .map(
        (entry): NodePathRange =>
          Array.isArray(entry)
            ? [tree.getNodePath(entry[0]), entry[1]]
            : "nodePath" in entry
            ? [entry.nodePath, entry.f]
            : [tree.getNodePath(entry)]
      )
  );
