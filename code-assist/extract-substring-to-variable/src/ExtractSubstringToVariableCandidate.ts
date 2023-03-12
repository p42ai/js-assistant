
import { Match } from "@p42/engine";
import ts from "typescript";

// complex selection when extracting from template expressions:
export type TemplateSelection = {
  leadingText: string;
  // indices of template span range that contains the expressions that need to be moved:
  startSpanIndex: number;
  endSpanIndex: number;
  trailingText: string;
};

export interface ExtractSubstringToVariableCandidate
  extends Match<
    | ts.StringLiteral
    | ts.NoSubstitutionTemplateLiteral
    | ts.TemplateHead
    | ts.TemplateMiddle
    | ts.TemplateTail
    | ts.TemplateExpression,
    Record<string, never>,
    {
      leadingText: string;
      selection: string | TemplateSelection;
      trailingText: string;
    }
  > {}
