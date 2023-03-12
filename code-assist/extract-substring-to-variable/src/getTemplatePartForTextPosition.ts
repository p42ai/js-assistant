
import ts from "typescript";

/**
 * @returns Template part that contains position as part of its text. When the position
 *          is inside an expression or outside the template, undefined is returned.
 */
export const getTemplatePartForTextPosition = (
  position: number,
  template: ts.TemplateExpression
): ts.TemplateHead | ts.TemplateMiddle | ts.TemplateTail | undefined => {
  // outside of template expression:
  if (position < template.pos || template.end < position) {
    return undefined;
  }

  // template head:
  const { head } = template;
  if (head.pos <= position && position < head.end) {
    return head;
  }

  for (const span of template.templateSpans) {
    const { literal } = span;

    // performance: abort early scan has gone beyond position:
    if (position < literal.pos) {
      return undefined;
    }

    // template middle or tail:
    if (literal.pos <= position && position < literal.end) {
      return literal;
    }
  }

  return undefined;
};
