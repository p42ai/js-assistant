
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type ConvertToOptionalChainingNode =
  | ts.BinaryExpression
  | ts.ConditionalExpression;

type ConvertToOptionalChainingCaptures = {
  /**
   * Expression that is potentially nullish.
   */
  mainExpression: ts.Expression;
  /**
   * Expression that is evaluated if the main expression is non-nullish.
   */
  finalExpression: ts.Expression;
  /**
   * Part of the final expression that needs to be replaced with the optional chain.
   */
  finalExpressionReplacementPart:
    | ts.PropertyAccessExpression
    | ts.ElementAccessExpression
    | ts.CallExpression;
  /**
   * Inner part of the final expression that needs to be retained.
   */
  finalMemberAccess: ts.Expression;
  nullishCheckType: "== null ||" | "!= null &&" | undefined;
};

export class ConvertToOptionalChainingMatch
  implements
    Match<
      ConvertToOptionalChainingNode,
      ConvertToOptionalChainingCaptures,
      undefined
    >
{
  constructor(
    readonly node: ConvertToOptionalChainingNode,
    readonly captures: ConvertToOptionalChainingCaptures,
    readonly data: undefined,
    readonly context: Context
  ) {}
}
