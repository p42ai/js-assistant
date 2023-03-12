import { Context, Match } from "@p42/engine";
import ts from "typescript";

type RemoveUnnecessaryConditionalExpressionNode = ts.ConditionalExpression;
type RemoveUnnecessaryConditionalExpressionCaptures = {
  replacement: ts.Expression;
  type: "same-result" | "condition-is-result";
};
type RemoveUnnecessaryConditionalExpressionData = {
  isBooleanCondition: boolean;
};

export class RemoveUnnecessaryConditionalExpressionMatch
  implements
    Match<
      RemoveUnnecessaryConditionalExpressionNode,
      RemoveUnnecessaryConditionalExpressionCaptures,
      RemoveUnnecessaryConditionalExpressionData
    >
{
  constructor(
    readonly node: RemoveUnnecessaryConditionalExpressionNode,
    readonly captures: RemoveUnnecessaryConditionalExpressionCaptures,
    readonly data: RemoveUnnecessaryConditionalExpressionData,
    readonly context: Context
  ) {}

  getTypeLabel() {
    // TODO automated refactoring: convert into lookup
    switch (this.captures.type) {
      case "same-result":
        return "result";
      case "condition-is-result":
        return "condition";
    }
  }
}
