import ts from "typescript";

export function getIndicatorText(node: ts.Node, maxChars = 10) {
  const nodeText = node.getText();
  return (
    nodeText.substring(0, maxChars) + (nodeText.length > maxChars ? "..." : "")
  );
}
