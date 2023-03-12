import { Context, Match } from "@p42/engine";
import ts from "typescript";

type AddBracesToCaseNode = ts.CaseClause;
type AddBracesToCaseCaptures = Record<string, never>;
type AddBracesToCaseData = undefined;

export class AddBracesToCaseMatch
  implements
    Match<AddBracesToCaseNode, AddBracesToCaseCaptures, AddBracesToCaseData>
{
  constructor(
    readonly node: AddBracesToCaseNode,
    readonly captures: AddBracesToCaseCaptures,
    readonly data: AddBracesToCaseData,
    readonly context: Context
  ) {}
}
