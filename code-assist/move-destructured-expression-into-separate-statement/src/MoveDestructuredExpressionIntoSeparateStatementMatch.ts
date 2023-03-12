
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type MoveDestructuredExpressionIntoSeparateStatementNode = ts.BindingElement;
type MoveDestructuredExpressionIntoSeparateStatementCaptures = {
  baseExpression: ts.Expression;
  statement: ts.VariableStatement;
};
type MoveDestructuredExpressionIntoSeparateStatementData = undefined;

export class MoveDestructuredExpressionIntoSeparateStatementMatch
  implements
    Match<
      MoveDestructuredExpressionIntoSeparateStatementNode,
      MoveDestructuredExpressionIntoSeparateStatementCaptures,
      MoveDestructuredExpressionIntoSeparateStatementData
    >
{
  constructor(
    readonly node: MoveDestructuredExpressionIntoSeparateStatementNode,
    readonly captures: MoveDestructuredExpressionIntoSeparateStatementCaptures,
    readonly data: MoveDestructuredExpressionIntoSeparateStatementData,
    readonly context: Context
  ) {}
}
