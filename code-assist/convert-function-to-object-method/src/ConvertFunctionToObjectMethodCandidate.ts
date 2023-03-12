import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertFunctionToObjectMethodCandidate
  extends Match<
    ts.PropertyAssignment,
    {
      name: string;
      functionExpression: ts.FunctionExpression;
    },
    undefined
  > {}
