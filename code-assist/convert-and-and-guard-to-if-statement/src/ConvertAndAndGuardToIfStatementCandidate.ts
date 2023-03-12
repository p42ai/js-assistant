import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertAndAndGuardToIfStatementCandidate
  extends Match<
    ts.Node,
    {
      guard: ts.Expression;
      guardedExpression: ts.Expression;
    },
    undefined
  > {}
