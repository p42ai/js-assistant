import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertTemplateLiteralToStringCandidate
  extends Match<
    ts.NoSubstitutionTemplateLiteral,
    Record<string, never>,
    undefined
  > {}
