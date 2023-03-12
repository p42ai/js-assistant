import { Match } from "@p42/engine";
import ts from "typescript";

export interface RemoveUnnecessaryTemplateCandidate
  extends Match<
    ts.TemplateExpression,
    {
      expression: ts.Expression;
    },
    {
      isStringLike: boolean;
    }
  > {}
