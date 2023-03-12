
import { Match, Scope } from "@p42/engine";
import ts from "typescript";

export interface ExtractVariableCandidate
  extends Match<
    ts.Expression,
    Record<string, never>,
    {
      targetScope: Scope;
      occurrences: ts.Expression[];
    }
  > {}
