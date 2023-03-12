
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type ConvertToIncrementNode = ts.BinaryExpression;
type ConvertToIncrementCaptures = {
  type: "increment" | "decrement";
  targetExpression: ts.Expression;
};
type ConvertToIncrementData = undefined;

export class ConvertToIncrementMatch
  implements
    Match<
      ConvertToIncrementNode,
      ConvertToIncrementCaptures,
      ConvertToIncrementData
    >
{
  constructor(
    readonly node: ConvertToIncrementNode,
    readonly captures: ConvertToIncrementCaptures,
    readonly data: ConvertToIncrementData,
    readonly context: Context
  ) {}

  get unaryOperator(): ts.PostfixUnaryOperator {
    switch (this.captures.type) {
      case "decrement":
        return ts.SyntaxKind.MinusMinusToken;
      case "increment":
        return ts.SyntaxKind.PlusPlusToken;
      default:
        throw new Error(`unsupported type: ${this.captures.type}`);
    }
  }

  get shortType(): "++" | "--" {
    switch (this.captures.type) {
      case "decrement":
        return "--";
      case "increment":
        return "++";
      default:
        throw new Error(`unsupported type: ${this.captures.type}`);
    }
  }
}
