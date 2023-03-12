import { Match } from "@p42/engine";
import ts from "typescript";

export interface RemoveEmptyIfBlockCandidate
  extends Match<
    ts.IfStatement,
    {
      thenBlock: ts.Block;
    },
    undefined
  > {}
