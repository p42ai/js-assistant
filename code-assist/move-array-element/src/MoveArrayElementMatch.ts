
import { Context, MoveMatch } from "@p42/engine";
import ts from "typescript";

export class MoveArrayElementMatch extends MoveMatch<
  ts.ArrayLiteralExpression,
  ts.Expression
> {
  constructor(
    node: ts.ArrayLiteralExpression,
    captures: {
      selectedChildren: Array<ts.Expression>;
    },
    data: undefined,
    context: Context
  ) {
    super(node, captures, data, context);
  }

  get allChildren() {
    return this.node.elements;
  }
}
