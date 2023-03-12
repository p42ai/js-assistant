import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertStringToTemplateLiteralCandidate
  extends Match<ts.StringLiteral, Record<string, never>, undefined> {}
