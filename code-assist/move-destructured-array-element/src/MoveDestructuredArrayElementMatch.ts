
import { Context, MoveMatch } from "@p42/engine";
import ts from "typescript";

export class MoveDestructuredArrayElementMatch extends MoveMatch<
  ts.ArrayBindingPattern,
  ts.ArrayBindingElement
> {
  constructor(
    node: ts.ArrayBindingPattern,
    captures: {
      selectedChildren: Array<ts.ArrayBindingElement>;
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
