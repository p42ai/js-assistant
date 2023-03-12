import { Match } from "@p42/engine";
import ts from "typescript";

export interface SurroundWithTryCatchCandidate
  extends Match<
    ts.BlockLike,
    {
      selectedStatements: Array<ts.Statement>;
    },
    undefined
  > {}
