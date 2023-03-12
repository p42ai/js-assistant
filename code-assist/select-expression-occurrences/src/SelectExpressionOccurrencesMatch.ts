
import { Context, Match } from "@p42/engine";
import ts from "typescript";

export type SelectExpressionOccurrencesMatchType = Match<
  ts.Expression,
  Record<string, never>,
  {
    occurrences: ts.Expression[];
  }
>;

export class SelectExpressionOccurrencesMatch
  implements SelectExpressionOccurrencesMatchType
{
  constructor(
    readonly node: SelectExpressionOccurrencesMatchType["node"],
    readonly captures: SelectExpressionOccurrencesMatchType["captures"],
    readonly data: SelectExpressionOccurrencesMatchType["data"],
    readonly context: Context
  ) {}

  get occurrenceCount() {
    return this.data.occurrences.length;
  }
}
