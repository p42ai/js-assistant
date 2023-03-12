import { Match } from "@p42/engine";
import ts from "typescript";

export interface InsertConsoleLogCandidate
  extends Match<
    ts.Identifier,
    Record<string, never>,
    {
      statementAncestor: ts.Statement;
    }
  > {}
