
import { Match } from "@p42/engine";
import ts from "typescript";

export interface MoveLastStatementOutOfIfElseCandidate
  extends Match<
    ts.IfStatement,
    {
      thenOccurrence: ts.Statement;
      elseOccurrence: ts.Statement;
    },
    {
      isSingleStatementIfElse: boolean;
    }
  > {}
