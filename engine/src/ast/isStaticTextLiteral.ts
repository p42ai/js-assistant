import ts from "typescript";

export function isStaticTextLiteral(
  node: ts.Node
): node is ts.NoSubstitutionTemplateLiteral | ts.StringLiteral {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node);
}
