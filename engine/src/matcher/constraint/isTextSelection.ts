import ts from "typescript";
import { isPositionInsideNodeText } from "../../ast/isPositionInsideNodeText";
import { Context } from "../engine/Context";

export function isTextSelection(
  node: ts.Node,
  context: Context
): node is
  | ts.StringLiteral
  | ts.NoSubstitutionTemplateLiteral
  | ts.TemplateHead
  | ts.TemplateMiddle
  | ts.TemplateTail {
  if (
    !(
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddleOrTemplateTail(node)
    )
  ) {
    return false;
  }

  const range = context!.selectedRange!;

  return (
    isPositionInsideNodeText(range.start, node) &&
    isPositionInsideNodeText(range.end, node)
  );
}
