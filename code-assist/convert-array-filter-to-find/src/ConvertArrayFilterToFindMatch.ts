import { Context, Match } from "@p42/engine";
import ts from "typescript";

type ConvertArrayFilterToFindNode = ts.ElementAccessExpression;
type ConvertArrayFilterToFindCaptures = {
  filterCall: ts.CallExpression;
  filterName: ts.Identifier;
  target: ts.Expression;
};
type ConvertArrayFilterToFindData = undefined;

export class ConvertArrayFilterToFindMatch
  implements
    Match<
      ConvertArrayFilterToFindNode,
      ConvertArrayFilterToFindCaptures,
      ConvertArrayFilterToFindData
    >
{
  constructor(
    readonly node: ConvertArrayFilterToFindNode,
    readonly captures: ConvertArrayFilterToFindCaptures,
    readonly data: ConvertArrayFilterToFindData,
    readonly context: Context
  ) {}
}
