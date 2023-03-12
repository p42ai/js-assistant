import { Match } from "@p42/engine";
import ts from "typescript";

export interface RemoveUnnecessaryExpressionStatementCandidate
  extends Match<
    ts.ExpressionStatement,
    Record<string, never>,
    {
      containsGlobal: boolean;
    }
  > {}
