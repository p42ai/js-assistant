
import { Context, Match } from "@p42/engine";
import ts from "typescript";

export type ConvertArrayIndexOfToArrayIncludesMatchType = Match<
  ts.BinaryExpression,
  {
    indexOfCall: ts.CallExpression;
    indexOfPropertyAccess: ts.PropertyAccessExpression;
    firstParameter: ts.Expression;
    isNegated: boolean;
  },
  {
    targetType: ts.Type;
  }
>;

export class ConvertArrayIndexOfToArrayIncludesMatch
  implements ConvertArrayIndexOfToArrayIncludesMatchType
{
  constructor(
    readonly node: ConvertArrayIndexOfToArrayIncludesMatchType["node"],
    readonly captures: ConvertArrayIndexOfToArrayIncludesMatchType["captures"],
    readonly data: ConvertArrayIndexOfToArrayIncludesMatchType["data"],
    readonly context: Context
  ) {}
}
