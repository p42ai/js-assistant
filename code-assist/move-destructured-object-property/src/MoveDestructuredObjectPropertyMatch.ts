
import { Context, MoveMatch } from "@p42/engine";
import ts from "typescript";

export class MoveDestructuredObjectPropertyMatch extends MoveMatch<
  ts.ObjectBindingPattern,
  ts.BindingElement
> {
  constructor(
    node: ts.ObjectBindingPattern,
    captures: {
      selectedChildren: Array<ts.BindingElement>;
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
