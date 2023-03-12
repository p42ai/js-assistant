
import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertFunctionToArrowFunctionCandidate
  extends Match<
    ts.FunctionExpression | ts.CallExpression,
    {
      functionExpression: ts.FunctionExpression;
      return: ts.LeftHandSideExpression | undefined;
      content: ts.Block;
    },
    undefined
  > {}
