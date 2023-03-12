
import { Context, hasDescendant, Match } from "@p42/engine";
import ts from "typescript";

type SimplifySwitchNode = ts.SwitchStatement;
type SimplifySwitchCaptures = Record<string, never>;
type SimplifySwitchData = undefined;

export class SimplifySwitchMatch
  implements
    Match<SimplifySwitchNode, SimplifySwitchCaptures, SimplifySwitchData>
{
  constructor(
    readonly node: SimplifySwitchNode,
    readonly captures: SimplifySwitchCaptures,
    readonly data: SimplifySwitchData,
    readonly context: Context
  ) {}

  containsVariableStatement(): boolean {
    return hasDescendant(
      this.node,
      (descendant) => ts.isVariableStatement(descendant),
      this.context
    );
  }
}
