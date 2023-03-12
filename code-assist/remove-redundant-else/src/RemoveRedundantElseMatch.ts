import { Context, Match } from "@p42/engine";
import ts from "typescript";

type RemoveRedundantElseNode = ts.IfStatement;
type RemoveRedundantElseCaptures = {
  condition: ts.Expression;
  elseIf: ts.IfStatement;
  elseIfBody: ts.Statement;
};
type RemoveRedundantElseData = undefined;

export class RemoveRedundantElseMatch
  implements
    Match<
      RemoveRedundantElseNode,
      RemoveRedundantElseCaptures,
      RemoveRedundantElseData
    >
{
  constructor(
    readonly node: RemoveRedundantElseNode,
    readonly captures: RemoveRedundantElseCaptures,
    readonly data: RemoveRedundantElseData,
    readonly context: Context
  ) {}

  hasElseStatement(): boolean {
    return this.captures.elseIf.elseStatement != null;
  }
}
