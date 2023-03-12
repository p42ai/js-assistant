import { ArrayLoopMatch } from "@p42/augmentation-array-loop";
import { Context, Match } from "@p42/engine";
import ts from "typescript";

export type ConvertLoopToMapMatchType = Match<
  ArrayLoopMatch["node"],
  {
    loop: ArrayLoopMatch;
    resultArray: ts.Identifier;
    elementExpression: ts.Expression;
    block: ts.Block;
    variableDeclaration: ts.VariableDeclaration;
  },
  undefined
>;

export interface ConvertLoopToMapMatch
  extends Match<
    ArrayLoopMatch["node"],
    {
      loop: ArrayLoopMatch;
      resultArray: ts.Identifier;
      elementExpression: ts.Expression;
      block: ts.Block;
      variableDeclaration: ts.VariableDeclaration;
    },
    undefined
  > {}

export class ConvertLoopToMapMatch implements ConvertLoopToMapMatchType {
  constructor(
    readonly node: ConvertLoopToMapMatchType["node"],
    readonly captures: ConvertLoopToMapMatchType["captures"],
    readonly data: ConvertLoopToMapMatchType["data"],
    readonly context: Context
  ) {}

  getMethodName() {
    return ts.isSpreadElement(this.captures.elementExpression)
      ? "flatMap"
      : "map";
  }

  /**
   * Expression that should be used in the introduced return statement.
   */
  getReturnExpression() {
    const { elementExpression } = this.captures;
    return ts.isSpreadElement(elementExpression)
      ? elementExpression.expression
      : elementExpression;
  }
}
