import ts from "typescript";

export function isMethodCallTarget(occurrence: ts.Expression) {
  return (
    ts.isPropertyAccessExpression(occurrence) &&
    ts.isCallExpression(occurrence.parent) &&
    occurrence.parent.expression === occurrence
  );
}
