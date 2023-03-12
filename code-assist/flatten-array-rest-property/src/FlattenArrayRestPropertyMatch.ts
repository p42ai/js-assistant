
import { Context, Match } from "@p42/engine";
import ts from "typescript";

export type FlattenArrayRestPropertyMatchType = Match<
  ts.BindingElement | ts.SpreadElement,
  Record<string, never>,
  | {
      type: ts.SyntaxKind.BindingElement;
      innerExpression: ts.ArrayBindingPattern;
      outerExpression: ts.ArrayBindingPattern;
    }
  | {
      type: ts.SyntaxKind.SpreadElement;
      innerExpression: ts.ArrayLiteralExpression;
      outerExpression: ts.ArrayLiteralExpression;
    }
>;

export class FlattenArrayRestPropertyMatch
  implements FlattenArrayRestPropertyMatchType
{
  constructor(
    readonly node: FlattenArrayRestPropertyMatchType["node"],
    readonly captures: FlattenArrayRestPropertyMatchType["captures"],
    readonly data: FlattenArrayRestPropertyMatchType["data"],
    readonly context: Context
  ) {}
}
