
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type MergeIntoPrecedingIfStatementNode = ts.IfStatement;
type MergeIntoPrecedingIfStatementCaptures = {
  targetIfStatement: ts.IfStatement;
};
type MergeIntoPrecedingIfStatementData = undefined;

export class MergeIntoPrecedingIfStatementMatch
  implements
    Match<
      MergeIntoPrecedingIfStatementNode,
      MergeIntoPrecedingIfStatementCaptures,
      MergeIntoPrecedingIfStatementData
    >
{
  constructor(
    readonly node: MergeIntoPrecedingIfStatementNode,
    readonly captures: MergeIntoPrecedingIfStatementCaptures,
    readonly data: MergeIntoPrecedingIfStatementData,
    readonly context: Context
  ) {}
}
