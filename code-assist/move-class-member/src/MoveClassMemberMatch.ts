
import { Context, MoveMatch } from "@p42/engine";
import ts from "typescript";

export class MoveClassMemberMatch extends MoveMatch<
  ts.ClassLikeDeclaration,
  ts.ClassElement
> {
  constructor(
    node: ts.ClassLikeDeclaration,
    captures: {
      selectedChildren: Array<ts.ClassElement>;
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
