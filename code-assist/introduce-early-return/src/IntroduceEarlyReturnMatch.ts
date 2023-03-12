
import { Context, FunctionLike, Loop, Match } from "@p42/engine";
import ts from "typescript";

export type IntroduceEarlyReturnMatchType = Match<
  ts.IfStatement,
  {
    container: Loop.Loop | FunctionLike.FunctionLike;
  },
  undefined
>;

export class IntroduceEarlyReturnMatch
  implements IntroduceEarlyReturnMatchType
{
  constructor(
    readonly node: IntroduceEarlyReturnMatchType["node"],
    readonly captures: IntroduceEarlyReturnMatchType["captures"],
    readonly data: IntroduceEarlyReturnMatchType["data"],
    readonly context: Context
  ) {}

  hasElseStatement() {
    return this.node.elseStatement != null;
  }

  get type(): "return" | "continue" {
    return Loop.isLoop(this.captures.container) ? "continue" : "return";
  }
}
