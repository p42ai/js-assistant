import { Context, Match } from "@p42/engine";
import ts from "typescript";

type RemoveBracesFromArrowFunctionNode = ts.ArrowFunction;
type RemoveBracesFromArrowFunctionCaptures = {
  returnedExpression: ts.Expression;
};
type RemoveBracesFromArrowFunctionData = undefined;

export class RemoveBracesFromArrowFunctionMatch
  implements
    Match<
      RemoveBracesFromArrowFunctionNode,
      RemoveBracesFromArrowFunctionCaptures,
      RemoveBracesFromArrowFunctionData
    >
{
  constructor(
    readonly node: RemoveBracesFromArrowFunctionNode,
    readonly captures: RemoveBracesFromArrowFunctionCaptures,
    readonly data: RemoveBracesFromArrowFunctionData,
    readonly context: Context
  ) {}
}
