import { Match } from "@p42/engine";
import ts from "typescript";

export interface ExpandSelfClosingJsxElementCandidate
  extends Match<ts.JsxSelfClosingElement, Record<string, never>, undefined> {}
