
import { Match } from "@p42/engine";
import ts from "typescript";

export interface UseTemplateLiteralCandidate
  extends Match<
    ts.BinaryExpression,
    {
      parts: Array<ts.Expression>;
    },
    {
      target: "string" | "template literal";
    }
  > {}
