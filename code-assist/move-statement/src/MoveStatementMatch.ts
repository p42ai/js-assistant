
import { Context, MoveMatch } from "@p42/engine";
import ts from "typescript";

export class MoveStatementMatch extends MoveMatch<ts.BlockLike, ts.Statement> {
  constructor(
    node: ts.BlockLike,
    captures: {
      selectedChildren: Array<ts.Statement>;
    },
    data: undefined,
    context: Context
  ) {
    super(node, captures, data, context);
  }

  get allChildren() {
    return this.node.statements;
  }
}
