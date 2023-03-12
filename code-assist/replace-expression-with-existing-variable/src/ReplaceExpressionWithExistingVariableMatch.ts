
import { Binding, Context, Match } from "@p42/engine";
import ts from "typescript";

export type ReplaceExpressionWithExistingVariableMatchType = Match<
  ts.Expression,
  {
    binding: Binding;
    variableDeclaration: ts.VariableDeclaration;
  },
  undefined
>;

export class ReplaceExpressionWithExistingVariableMatch
  implements ReplaceExpressionWithExistingVariableMatchType
{
  constructor(
    readonly node: ReplaceExpressionWithExistingVariableMatchType["node"],
    readonly captures: ReplaceExpressionWithExistingVariableMatchType["captures"],
    readonly data: ReplaceExpressionWithExistingVariableMatchType["data"],
    readonly context: Context
  ) {}

  getVariableName(): string {
    return this.captures.binding.name;
  }
}
