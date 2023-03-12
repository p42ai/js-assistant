import { Match } from "@p42/engine";
import ts from "typescript";

export interface PullUpNegationCandidate
  extends Match<ts.BinaryExpression, Record<string, never>, undefined> {}
