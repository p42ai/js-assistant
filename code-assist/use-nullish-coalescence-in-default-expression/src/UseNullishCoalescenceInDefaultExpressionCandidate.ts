
import { Match } from "@p42/engine";
import ts from "typescript";

export interface UseNullishCoalescenceInDefaultExpressionCandidate
  extends Match<
    ts.ConditionalExpression | ts.IfStatement,
    {
      checkedExpression: ts.Expression;
      default: ts.Expression;
      variableName: string;
    },
    undefined
  > {}
