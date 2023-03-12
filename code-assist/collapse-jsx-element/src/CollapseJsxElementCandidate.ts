import { Match } from "@p42/engine";
import ts from "typescript";

export interface CollapseJsxElementCandidate
  extends Match<ts.JsxElement, Record<string, never>, undefined> {}
