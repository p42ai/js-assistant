import { Match } from "@p42/engine";
import ts from "typescript";

export interface SeparateConditionIntoNestedIfCandidate
  extends Match<
    ts.IfStatement,
    {
      fixedCondition: ts.Expression;
      innerCondition: ts.Expression;
      elseIf: ts.IfStatement;
    },
    undefined
  > {}
