import { Context, Match } from "@p42/engine";
import ts from "typescript";

type AddBracesToArrowFunctionNode = ts.ArrowFunction;
type AddBracesToArrowFunctionCaptures = {
  bodyExpression: ts.Expression;
};
type AddBracesToArrowFunctionData = undefined;

export class AddBracesToArrowFunctionMatch
  implements
    Match<
      AddBracesToArrowFunctionNode,
      AddBracesToArrowFunctionCaptures,
      AddBracesToArrowFunctionData
    >
{
  constructor(
    readonly node: AddBracesToArrowFunctionNode,
    readonly captures: AddBracesToArrowFunctionCaptures,
    readonly data: AddBracesToArrowFunctionData,
    readonly context: Context
  ) {}
}
