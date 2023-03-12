import { Match } from "@p42/engine";
import ts from "typescript";

export interface PushParameterIntoIifeCandidate
  extends Match<
    ts.ParameterDeclaration,
    {
      function: ts.ArrowFunction | ts.FunctionExpression;
      callExpression: ts.CallExpression;
    },
    {
      type: "IIFE" | "IIAF";
      argument: ts.Expression;
    }
  > {}
