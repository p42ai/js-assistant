import { Match } from "@p42/engine";
import ts from "typescript";

export type UndefinedCheckType =
  | "EQ_EQ_EQ_UNDEFINED"
  | "TYPEOF_EQ_EQ_UNDEFINED"
  | "TYPEOF_EQ_EQ_EQ_UNDEFINED";

export interface UndefinedCheckMatch
  extends Match<
    ts.BinaryExpression,
    {
      /**
       * The expression that is tested if it's undefined. If there are multiple similar expression
       * that are part of the overall check, the first such expression is used.
       */
      checkedExpression: ts.Expression;

      /**
       * True if it's a not-null check.
       */
      isNegated: boolean;

      checkType: UndefinedCheckType;
    },
    undefined
  > {}
