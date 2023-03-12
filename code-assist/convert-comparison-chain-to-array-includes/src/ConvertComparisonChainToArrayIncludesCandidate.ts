
import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertComparisonChainToArrayIncludesCandidate
  extends Match<
    ts.BinaryExpression,
    {
      expression: ts.Expression;
      values: Array<ts.StringLiteral>;
      isNegated: boolean;
    },
    undefined
  > {}
