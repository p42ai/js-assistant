
import { Context, Match } from "@p42/engine";
import ts from "typescript";

export type ConvertNewArrayToArrayLiteralMatchType = Match<
  ts.NewExpression,
  {
    type: ts.TypeNode | undefined;
  },
  undefined
>;

export class ConvertNewArrayToArrayLiteralMatch
  implements ConvertNewArrayToArrayLiteralMatchType
{
  constructor(
    readonly node: ConvertNewArrayToArrayLiteralMatchType["node"],
    readonly captures: ConvertNewArrayToArrayLiteralMatchType["captures"],
    readonly data: ConvertNewArrayToArrayLiteralMatchType["data"],
    readonly context: Context
  ) {}
}
