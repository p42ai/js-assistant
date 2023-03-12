import { Match } from "@p42/engine";
import ts from "typescript";

export interface ReplaceLodashSomeWithJavascriptArraySomeCandidate
  extends Match<ts.CallExpression, Record<string, never>, undefined> {}
