import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertMathPowToExponentiationCandidate
  extends Match<
    ts.CallExpression,
    {
      base: ts.Expression;
      exponent: ts.Expression;
    },
    undefined
  > {}
