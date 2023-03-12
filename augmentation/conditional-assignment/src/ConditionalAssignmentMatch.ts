import { Match } from "@p42/engine";
import ts from "typescript";

export type ConditionalAssignmentType =
  | "IF_ELSE_STATEMENT"
  | "CONDITIONAL_EXPRESSION";

export interface ConditionalAssignmentMatch
  extends Match<
    /**
     * Root expression of the subtree that contains the conditional assignment.
     */
    ts.IfStatement | ts.BinaryExpression,
    {
      type: ConditionalAssignmentType;

      /**
       * The variable that is being assigned.
       */
      // TODO change to Binding
      variableName: string;

      /**
       * The expression that is evaluated to determine which value to assign.
       */
      condition: ts.Expression;

      /**
       * The value that is assigned if condition is truthy.
       */
      whenTrue: ts.Expression;

      /**
       * The value that is assigned if condition is falsy.
       */
      whenFalse: ts.Expression;
    },
    undefined
  > {}
