import ts from "typescript";
import { resolveNodePath } from "../../ast/NodePath";
import { HighlightOperation } from "../../transformation/editor-operation";
import { Range } from "../../util/text/Range";

export type HighlightAction = {
  type: "HIGHLIGHT";
  highlights: Array<Range>;
};

export function createHighlightAction(
  operation: HighlightOperation,
  sourceFile: ts.SourceFile,
  offset: number
): HighlightAction | undefined {
  const resolvedHighlightRanges: Array<Range> = [];

  for (const [nodePath, resolve] of operation.highlights) {
    const node = resolveNodePath(nodePath, sourceFile);

    if (node == null) {
      continue;
    }

    const range =
      resolve?.(node) ?? new Range(node.getStart(sourceFile), node.getEnd());

    resolvedHighlightRanges.push(range.move(offset));
  }

  return resolvedHighlightRanges.length !== 0
    ? {
        type: "HIGHLIGHT",
        highlights: resolvedHighlightRanges,
      }
    : undefined;
}
