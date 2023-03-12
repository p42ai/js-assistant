
import { Context, Match, NodeRange, Range } from "@p42/engine";
import ts from "typescript";

type MoveIfElseIfBranchesNode = ts.IfStatement;
type MoveIfElseIfBranchesCaptures = {
  elseIf: ts.IfStatement;
};
type MoveIfElseIfBranchesData = undefined;

export class MoveIfElseIfBranchesMatch
  implements
    Match<
      MoveIfElseIfBranchesNode,
      MoveIfElseIfBranchesCaptures,
      MoveIfElseIfBranchesData
    >
{
  constructor(
    readonly node: MoveIfElseIfBranchesNode,
    readonly captures: MoveIfElseIfBranchesCaptures,
    readonly data: MoveIfElseIfBranchesData,
    readonly context: Context
  ) {}

  get ifRange(): Range {
    return NodeRange.ifStatementHead(this.node);
  }

  get elseIfHeadRange(): Range {
    return new Range(
      NodeRange.ifStatementElseKeyword(this.node).start,
      NodeRange.ifStatementHead(this.captures.elseIf).end
    );
  }
}
