import ts from "typescript";

export const isInTaggedTemplate = (template: ts.TemplateLiteral): boolean =>
  ts.isTaggedTemplateExpression(template.parent);
