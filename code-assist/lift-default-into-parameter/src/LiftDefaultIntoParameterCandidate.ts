
import { Match } from "@p42/engine";
import ts from "typescript";

export interface LiftDefaultIntoParameterCandidate
  extends Match<
    ts.ParameterDeclaration,
    {
      defaultExpression: ts.Expression;
      defaultExpressionStatement: ts.ExpressionStatement;
      type: "nullish" | "falsy" | "undefined";
    },
    undefined
  > {}
