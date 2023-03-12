import { Match } from "@p42/engine";
import ts from "typescript";

export type NullishCheckType =
  | "EQ_EQ_NULL"
  | "EQ_EQ_UNDEFINED"
  | "EQ_EQ_EQ_NULL_OR_UNDEFINED";

export interface NullishCheckMatch
  extends Match<
    ts.BinaryExpression,
    {
      /**
       * The expression that is tested if it's nullish (i.e. null or undefined)
       */
      checkedExpression: ts.Expression;

      /**
       * True if it's a not-null check.
       */
      isNegated: boolean;

      checkType: NullishCheckType;
    },
    undefined
  > {}
