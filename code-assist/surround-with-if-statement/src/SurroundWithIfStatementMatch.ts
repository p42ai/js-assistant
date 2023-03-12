
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type SurroundWithIfStatementNode = ts.BlockLike;
type SurroundWithIfStatementCaptures = {
  selectedStatements: Array<ts.Statement>;
};
type SurroundWithIfStatementData = undefined;

export class SurroundWithIfStatementMatch
  implements
    Match<
      SurroundWithIfStatementNode,
      SurroundWithIfStatementCaptures,
      SurroundWithIfStatementData
    >
{
  constructor(
    readonly node: SurroundWithIfStatementNode,
    readonly captures: SurroundWithIfStatementCaptures,
    readonly data: SurroundWithIfStatementData,
    readonly context: Context
  ) {}
}
