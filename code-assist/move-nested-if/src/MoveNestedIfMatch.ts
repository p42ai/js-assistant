
import { Context, Match, NodeRange } from "@p42/engine";
import { match } from "assert";
import ts from "typescript";

type MoveNestedIfNode = ts.IfStatement;
type MoveNestedIfCaptures = {
  innerThenIf: ts.IfStatement;
  innerThenIfCondition: ts.Expression;
};
type MoveNestedIfData = undefined;

export class MoveNestedIfMatch
  implements Match<MoveNestedIfNode, MoveNestedIfCaptures, MoveNestedIfData>
{
  constructor(
    readonly node: MoveNestedIfNode,
    readonly captures: MoveNestedIfCaptures,
    readonly data: MoveNestedIfData,
    readonly context: Context
  ) {}

  hasInnerElse() {
    return this.innerThenElse != null || this.innerElseElse != null;
  }

  get innerElseIf() {
    const outerElse = this.node.elseStatement;

    if (outerElse == null) {
      return undefined;
    }

    if (ts.isBlock(outerElse)) {
      return outerElse.statements[0] as ts.IfStatement;
    }

    return outerElse as ts.IfStatement;
  }

  get innerThenElse() {
    return this.captures.innerThenIf.elseStatement;
  }

  get innerElseThen() {
    return this.innerElseIf?.thenStatement;
  }

  get innerElseElse() {
    return this.innerElseIf?.elseStatement;
  }

  get outerIfActionRange() {
    return NodeRange.ifStatementHead(this.node);
  }

  get innerThenIfActionRange() {
    return NodeRange.ifStatementHead(this.captures.innerThenIf);
  }

  get innerElseIfActionRange() {
    return this.innerElseIf != null
      ? NodeRange.ifStatementHead(this.innerElseIf)
      : undefined;
  }
}
