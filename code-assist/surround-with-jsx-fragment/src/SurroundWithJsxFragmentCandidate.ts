import { Match } from "@p42/engine";
import ts from "typescript";

export interface SurroundWithJsxFragmentCandidate
  extends Match<
    ts.JsxElement | ts.JsxFragment | ts.JsxSelfClosingElement,
    {
      type: "single" | "multiple";
      selectedChildren: Array<ts.JsxChild>;
    },
    undefined
  > {}
