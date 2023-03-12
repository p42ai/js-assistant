import { Match } from "@p42/engine";
import ts from "typescript";

export interface RemoveUnnecessaryJsxFragmentCandidate
  extends Match<
    ts.JsxFragment,
    {
      replacement: ts.Node;
    },
    undefined
  > {}
