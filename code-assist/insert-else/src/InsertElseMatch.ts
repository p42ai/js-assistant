
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type InsertElseNode = ts.IfStatement;
type InsertElseCaptures = Record<string, never>;
type InsertElseData = undefined;

export class InsertElseMatch
  implements Match<InsertElseNode, InsertElseCaptures, InsertElseData>
{
  constructor(
    readonly node: InsertElseNode,
    readonly captures: InsertElseCaptures,
    readonly data: InsertElseData,
    readonly context: Context
  ) {}
}
