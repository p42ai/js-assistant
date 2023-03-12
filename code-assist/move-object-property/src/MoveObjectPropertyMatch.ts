
import { Context, MoveMatch } from "@p42/engine";
import ts from "typescript";

export class MoveObjectPropertyMatch extends MoveMatch<
  ts.ObjectLiteralExpression,
  ts.ObjectLiteralElementLike
> {
  constructor(
    node: ts.ObjectLiteralExpression,
    captures: {
      selectedChildren: Array<ts.ObjectLiteralElementLike>;
    },
    data: undefined,
    context: Context
  ) {
    super(node, captures, data, context);
  }

  get allChildren() {
    return this.node.properties;
  }
}
