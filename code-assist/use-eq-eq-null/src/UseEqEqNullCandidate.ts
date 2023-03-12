import { Match } from "@p42/engine";
import ts from "typescript";

export interface UseEqEqNullCandidate
  extends Match<
    ts.BinaryExpression,
    {
      isNegated: boolean;
      checkedExpression: ts.Expression;
    },
    undefined
  > {}
