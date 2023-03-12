import { Match } from "@p42/engine";
import ts from "typescript";

export interface AddNumericSeparatorCandidate
  extends Match<
    ts.NumericLiteral | ts.BigIntLiteral,
    Record<string, never>,
    {
      type: "decimal" | "hex" | "binary" | "octal";
      nonDecimalLength: number;
    }
  > {}
