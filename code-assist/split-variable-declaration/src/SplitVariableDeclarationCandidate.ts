import { Match } from "@p42/engine";
import ts from "typescript";

export interface SplitVariableDeclarationCandidate
  extends Match<ts.VariableStatement, Record<string, never>, undefined> {}
