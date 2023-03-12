import { Match } from "@p42/engine";
import ts from "typescript";

export interface PushOperatorIntoAssignmentCandidate
  extends Match<
    ts.BinaryExpression,
    {
      targetExpression: ts.Expression;
      regularOperator: ts.BinaryOperator;
      operand: ts.Expression;
      isOperandFirst: boolean;
    },
    {
      assignmentOperator: ts.BinaryOperator;
    }
  > {}
