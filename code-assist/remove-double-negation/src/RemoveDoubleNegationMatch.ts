
import { Context, Match, Range } from "@p42/engine";
import ts from "typescript";

export type RemoveDoubleNegationMatchType = Match<
  ts.PrefixUnaryExpression,
  {
    expression: ts.Expression;
  },
  {
    isBooleanExpression: boolean;
  }
>;

export class RemoveDoubleNegationMatch
  implements RemoveDoubleNegationMatchType
{
  constructor(
    readonly node: RemoveDoubleNegationMatchType["node"],
    readonly captures: RemoveDoubleNegationMatchType["captures"],
    readonly data: RemoveDoubleNegationMatchType["data"],
    readonly context: Context
  ) {}

  getDoubleNegationRange(): Range {
    return new Range(this.node.getStart(), this.node.operand.getStart() + 1);
  }
}
