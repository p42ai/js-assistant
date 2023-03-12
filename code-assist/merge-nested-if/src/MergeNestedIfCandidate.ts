import { Match } from "@p42/engine";
import ts from "typescript";

export interface MergeNestedIfCandidate
  extends Match<
    ts.IfStatement,
    {
      innerIf: ts.IfStatement;
    },
    undefined
  > {}
