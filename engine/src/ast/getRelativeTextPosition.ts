import ts from "typescript";

/**
 * @param   position
 *          Position inside the source file.
 * @returns Index inside the text of the element.
 */
export const getRelativeTextPosition = (
  position: number,
  node:
    | ts.StringLiteral
    | ts.NoSubstitutionTemplateLiteral
    | ts.TemplateHead
    | ts.TemplateMiddle
    | ts.TemplateTail
): number => position - node.getStart() - 1;
