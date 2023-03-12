import { Context, Match } from "@p42/engine";
import ts from "typescript";

type ConvertIfElseToConditionalExpressionNode =
  | ts.Block
  | ts.CaseClause
  | ts.IfStatement;

export type ConvertIfElseToConditionalExpressionCaptures = {
  ifStatement: ts.IfStatement;
  whenTrue: ts.Expression;
  whenFalse: ts.Expression;
  assignmentOperator: ts.BinaryOperator;
  assignmentStatement: ts.ExpressionStatement;
  assignmentTarget: ts.Identifier | ts.PropertyAccessExpression;
  type:
    | "if-return"
    | "if-else-return"
    | "if-else-assignment"
    | "declaration-if-assignment";
  standaloneReturnStatement: ts.ReturnStatement; // only for type "if-return"
  variableDeclaration: ts.VariableDeclaration; // only for type "declaration-if-assignment"
};

type ConvertIfElseToConditionalExpressionData = undefined;

export class ConvertIfElseToConditionalExpressionMatch
  implements
    Match<
      ConvertIfElseToConditionalExpressionNode,
      ConvertIfElseToConditionalExpressionCaptures,
      ConvertIfElseToConditionalExpressionData
    >
{
  constructor(
    readonly node: ConvertIfElseToConditionalExpressionNode,
    readonly captures: ConvertIfElseToConditionalExpressionCaptures,
    readonly data: ConvertIfElseToConditionalExpressionData,
    readonly context: Context
  ) {}
}
