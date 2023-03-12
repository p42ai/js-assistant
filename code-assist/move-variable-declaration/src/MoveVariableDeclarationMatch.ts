
import { Context, MoveMatch } from "@p42/engine";
import ts from "typescript";

export class MoveVariableDeclarationMatch extends MoveMatch<
  ts.VariableDeclarationList,
  ts.VariableDeclaration
> {
  constructor(
    node: ts.VariableDeclarationList,
    captures: {
      selectedChildren: Array<ts.VariableDeclaration>;
    },
    data: undefined,
    context: Context
  ) {
    super(node, captures, data, context);
  }

  get allChildren() {
    return this.node.declarations;
  }
}
