
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type RemoveBracesFromCaseNode = ts.CaseClause;
type RemoveBracesFromCaseCaptures = {
  block: ts.Block;
};
type RemoveBracesFromCaseData = undefined;

export class RemoveBracesFromCaseMatch
  implements
    Match<
      RemoveBracesFromCaseNode,
      RemoveBracesFromCaseCaptures,
      RemoveBracesFromCaseData
    >
{
  constructor(
    readonly node: RemoveBracesFromCaseNode,
    readonly captures: RemoveBracesFromCaseCaptures,
    readonly data: RemoveBracesFromCaseData,
    readonly context: Context
  ) {}
}
