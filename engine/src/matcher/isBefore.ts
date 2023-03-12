import ts from "typescript";

export function isBefore(reference: ts.Node) {
  // performance: use .pos instead of .getStart()
  // (the difference is whitespace/comments and has no effect on node ordering)
  const referenceStart = reference.pos;
  return (node: ts.Node) => node.pos < referenceStart;
}
