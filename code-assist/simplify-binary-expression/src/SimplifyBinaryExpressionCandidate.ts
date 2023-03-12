import { Match } from "@p42/engine";
import ts from "typescript";

export interface SimplifyBinaryExpressionCandidate
  extends Match<
    ts.BinaryExpression,
    {
      operand: ts.Expression;
    },
    undefined
  > {}
