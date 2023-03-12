import { Match } from "@p42/engine";
import ts from "typescript";

export interface EqualityCheckMatch
  extends Match<
    ts.PrefixUnaryExpression | ts.BinaryExpression,
    {
      part1: ts.Expression;
      part2: ts.Expression;

      /**
       * True if the check is a strict check with === or !==
       */
      isStrict: boolean;

      /**
       * True if this is not equal comparison, either through negation or through
       * an unequal comparison operator.
       */
      isNegated: boolean;
    },
    undefined
  > {}
