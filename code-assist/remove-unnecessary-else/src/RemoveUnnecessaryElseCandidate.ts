import { Match } from "@p42/engine";
import ts from "typescript";

export interface RemoveUnnecessaryElseCandidate
  extends Match<
    ts.IfStatement,
    {
      block: ts.Block;
      thenWithoutReturn: boolean;
    },
    undefined
  > {}
