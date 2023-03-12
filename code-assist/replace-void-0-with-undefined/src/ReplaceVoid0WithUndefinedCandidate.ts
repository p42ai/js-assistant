
import { Match } from "@p42/engine";
import ts from "typescript";

export interface ReplaceVoid0WithUndefinedCandidate
  extends Match<ts.VoidExpression, Record<string, never>, undefined> {}
