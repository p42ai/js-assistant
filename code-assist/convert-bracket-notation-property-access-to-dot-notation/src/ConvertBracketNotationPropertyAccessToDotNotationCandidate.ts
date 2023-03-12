import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertBracketNotationPropertyAccessToDotNotationCandidate
  extends Match<
    ts.ElementAccessExpression,
    {
      name: string;
    },
    undefined
  > {}
