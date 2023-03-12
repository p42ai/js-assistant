import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertLetToConstCandidate
  extends Match<ts.VariableDeclarationList, Record<string, never>, undefined> {}
