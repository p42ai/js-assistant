
import { ArrayLoopMatch } from "@p42/augmentation-array-loop";
import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertLoopToForOfCandidate
  extends Match<
    ts.ForStatement | ts.ExpressionStatement,
    {
      arrayLoop: ArrayLoopMatch;
    },
    {
      isArrayPotentiallyModifiedInLoop: boolean;
    }
  > {}
