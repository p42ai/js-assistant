import { Match } from "@p42/engine";
import ts from "typescript";

export interface InlineIntoTemplateCandidate
  extends Match<
    ts.TemplateSpan,
    {
      expression:
        | ts.StringLiteral
        | ts.NoSubstitutionTemplateLiteral
        | ts.TemplateExpression;
    },
    undefined
  > {}
