import { ArrayLoopMatch } from "@p42/augmentation-array-loop";
import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertLoopToForWithIndexCandidate
  extends Match<
    ts.ForOfStatement,
    {
      arrayLoop: ArrayLoopMatch;
    },
    undefined
  > {}
