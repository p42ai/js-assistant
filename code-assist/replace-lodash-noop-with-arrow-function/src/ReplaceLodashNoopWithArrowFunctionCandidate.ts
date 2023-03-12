import { Match } from "@p42/engine";
import ts from "typescript";

export interface ReplaceLodashNoopWithArrowFunctionCandidate
  extends Match<
    ts.PropertyAccessExpression,
    Record<string, never>,
    undefined
  > {}
