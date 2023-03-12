import { Match } from "@p42/engine";
import ts from "typescript";

export interface PullOperatorOutOfAssignmentCandidate
  extends Match<
    ts.BinaryExpression,
    {
      targetExpression: ts.Expression;
      assignmentOperator: ts.BinaryOperator;
      operand: ts.Expression;
    },
    {
      regularOperator: ts.BinaryOperator;
    }
  > {}
