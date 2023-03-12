
import { Match } from "@p42/engine";
import ts from "typescript";

export interface MoveFirstStatementOutOfIfElseCandidate
  extends Match<
    ts.IfStatement,
    {
      thenOccurrence: ts.Statement;
      elseOccurrence: ts.Statement;
    },
    undefined
  > {}
