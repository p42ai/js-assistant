import { Match } from "@p42/engine";
import ts from "typescript";

export interface RemoveEmptyElseBlockCandidate
  extends Match<
    ts.IfStatement,
    {
      elseBlock: ts.Block;
    },
    undefined
  > {}
