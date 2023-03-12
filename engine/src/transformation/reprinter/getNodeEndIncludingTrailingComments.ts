import ts from "typescript";

export function getNodeEndIncludingTrailingComments(
  node: ts.Node,
  sourceText: string
): number {
  const nodeEnd = node.end;

  const trailingCommentRanges = ts.getTrailingCommentRanges(
    sourceText,
    nodeEnd
  );

  if (trailingCommentRanges == null) {
    return nodeEnd;
  }

  return Math.max(nodeEnd, ...trailingCommentRanges.map((range) => range.end));
}
