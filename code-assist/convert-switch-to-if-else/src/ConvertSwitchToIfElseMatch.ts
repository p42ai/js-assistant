
import { Context, Match, SwitchStatement } from "@p42/engine";
import ts from "typescript";

type ConvertSwitchToIfElseNode = ts.SwitchStatement;
type ConvertSwitchToIfElseCaptures = Record<string, never>;
type ConvertSwitchToIfElseData = undefined;

export class ConvertSwitchToIfElseMatch
  implements
    Match<
      ConvertSwitchToIfElseNode,
      ConvertSwitchToIfElseCaptures,
      ConvertSwitchToIfElseData
    >
{
  constructor(
    readonly node: ConvertSwitchToIfElseNode,
    readonly captures: ConvertSwitchToIfElseCaptures,
    readonly data: ConvertSwitchToIfElseData,
    readonly context: Context
  ) {}

  get caseClauses() {
    return SwitchStatement.getCaseClauses(this.node);
  }

  hasDefaultClause() {
    return SwitchStatement.hasDefaultClause(this.node);
  }
}
