import ts from "typescript";

export function isPositionInsideNodeText(
  position: number,
  node:
    | ts.StringLiteral
    | ts.NoSubstitutionTemplateLiteral
    | ts.TemplateHead
    | ts.TemplateMiddle
    | ts.TemplateTail
): boolean {
  // template head and template middle has 2 character end ${
  const endOffset =
    ts.isTemplateHead(node) || ts.isTemplateMiddle(node) ? 1 : 0;
  return node.getStart() < position && position < node.end - endOffset;
}
