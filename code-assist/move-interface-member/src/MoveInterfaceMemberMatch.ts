
import { Context, MoveMatch } from "@p42/engine";
import ts from "typescript";

export class MoveInterfaceMemberMatch extends MoveMatch<
  ts.InterfaceDeclaration,
  ts.TypeElement
> {
  constructor(
    node: ts.InterfaceDeclaration,
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
