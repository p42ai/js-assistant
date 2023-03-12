import ts from "typescript";

export function getLeadingComments(node: ts.Node) {
  return ts.getLeadingCommentRanges(
    node.getSourceFile().getFullText(),
    node.getFullStart()
  );
}
