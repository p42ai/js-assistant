
import { Context, MoveMatch } from "@p42/engine";
import ts from "typescript";

export class MoveSwitchCaseMatch extends MoveMatch<
  ts.CaseBlock,
  ts.CaseOrDefaultClause
> {
  constructor(
    node: ts.CaseBlock,
    captures: {
      selectedChildren: Array<ts.CaseOrDefaultClause>;
    },
    data: undefined,
    context: Context
  ) {
    super(node, captures, data, context);
  }

  get allChildren() {
    return this.node.clauses;
  }
}
