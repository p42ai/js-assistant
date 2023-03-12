import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertApplyToSpreadSyntaxCandidate
  extends Match<
    ts.CallExpression,
    {
      calledExpression: ts.Expression;
      args: ts.Expression;
      objectName: string;
      apply: ts.Identifier;
    },
    undefined
  > {}
