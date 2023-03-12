
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type ConvertDestructuredToRegularDeclarationNode = ts.VariableDeclaration;
type ConvertDestructuredToRegularDeclarationCaptures = {
  initializer: ts.Expression;
  root: ts.BindingPattern;
};
type ConvertDestructuredToRegularDeclarationData = {
  bindings: Array<ts.BindingElement>;
};

export class ConvertDestructuredToRegularDeclarationMatch
  implements
    Match<
      ConvertDestructuredToRegularDeclarationNode,
      ConvertDestructuredToRegularDeclarationCaptures,
      ConvertDestructuredToRegularDeclarationData
    >
{
  constructor(
    readonly node: ConvertDestructuredToRegularDeclarationNode,
    readonly captures: ConvertDestructuredToRegularDeclarationCaptures,
    readonly data: ConvertDestructuredToRegularDeclarationData,
    readonly context: Context
  ) {}

  get variableDeclarationList() {
    return this.node.parent as ts.VariableDeclarationList;
  }
}
