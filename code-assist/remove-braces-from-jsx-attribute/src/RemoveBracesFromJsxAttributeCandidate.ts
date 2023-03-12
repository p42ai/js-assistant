import { Match } from "@p42/engine";
import ts from "typescript";

export interface RemoveBracesFromJsxAttributeCandidate
  extends Match<
    ts.JsxAttribute,
    {
      value: ts.StringLiteral;
    },
    undefined
  > {}
