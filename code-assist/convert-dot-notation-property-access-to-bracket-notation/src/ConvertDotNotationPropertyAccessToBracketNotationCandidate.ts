import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertDotNotationPropertyAccessToBracketNotationCandidate
  extends Match<
    ts.PropertyAccessExpression,
    {
      name: string;
    },
    undefined
  > {}
