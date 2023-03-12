import ts from "typescript";

export function getNodeChildren(node: ts.Node): Array<ts.Node> {
  const children: Array<ts.Node> = [];
  node.forEachChild((child) => {
    children.push(child);
  });
  return children;
}
