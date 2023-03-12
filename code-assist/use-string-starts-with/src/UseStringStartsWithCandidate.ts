import { Match } from "@p42/engine";
import ts from "typescript";

export interface UseStringStartsWithCandidate
  extends Match<
    ts.BinaryExpression | ts.PrefixUnaryExpression,
    {
      targetString: ts.Identifier;
      testedCharacter: ts.StringLiteral;
      isNegated: boolean;
    },
    undefined
  > {}
