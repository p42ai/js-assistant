import { Match } from "@p42/engine";
import ts from "typescript";

export interface InvertConditionCandidate
  extends Match<
    ts.ConditionalExpression | ts.IfStatement,
    {
      /**
       * Overall condition, including ! prefix.
       */
      condition: ts.Expression;

      /**
       * Inner condition (inside ! and potentially parentheses)
       */
      innerCondition: ts.Expression;
    },
    {
      hasNegationPrefix: boolean;
      isNegated: boolean;
    }
  > {}
