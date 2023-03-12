import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertConditionalExpressionToIfElseCandidate
  extends Match<
    ts.ReturnStatement | ts.ExpressionStatement,
    {
      assignmentExpression: ts.BinaryExpression;
      conditionalExpression: ts.ConditionalExpression;
      type: "return" | "assignment" | "expression";
    },
    undefined
  > {}
