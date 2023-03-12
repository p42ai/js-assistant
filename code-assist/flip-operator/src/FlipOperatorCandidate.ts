import { Match } from "@p42/engine";
import ts from "typescript";

export interface FlipOperatorCandidate
  extends Match<ts.BinaryExpression, Record<string, never>, undefined> {}
