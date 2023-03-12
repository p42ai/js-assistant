
import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertNamedFunctionToFunctionExpressionCandidate
  extends Match<ts.FunctionDeclaration, Record<string, never>, undefined> {}
