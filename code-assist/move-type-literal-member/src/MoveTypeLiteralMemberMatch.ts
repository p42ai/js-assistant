
import { Context, MoveMatch } from "@p42/engine";
import ts from "typescript";

export class MoveTypeLiteralMemberMatch extends MoveMatch<
  ts.TypeLiteralNode,
  ts.TypeElement
> {
  constructor(
    node: ts.TypeLiteralNode,
    captures: {
      selectedChildren: Array<ts.TypeElement>;
    },
    data: undefined,
    context: Context
  ) {
    super(node, captures, data, context);
  }

  get allChildren() {
    return this.node.members;
  }
}
