import ts from "typescript";

export function visitSelfAndEachDescendant(
  node: ts.Node,
  visitor: (node: ts.Node) => void
): void {
  const wrappingVisitor = (node: ts.Node): void => {
    visitor(node);
    ts.forEachChild(node, wrappingVisitor);
  };
  wrappingVisitor(node);
}
