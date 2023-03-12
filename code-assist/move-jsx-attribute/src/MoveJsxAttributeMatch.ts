
import { Context, MoveMatch } from "@p42/engine";
import ts from "typescript";

export class MoveJsxAttributeMatch extends MoveMatch<
  ts.JsxAttributes,
  ts.JsxAttributeLike
> {
  constructor(
    node: ts.JsxAttributes,
    captures: {
      selectedChildren: Array<ts.JsxAttributeLike>;
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
