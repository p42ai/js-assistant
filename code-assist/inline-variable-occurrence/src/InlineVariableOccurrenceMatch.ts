
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type InlineVariableOccurrenceNode = ts.Node;
type InlineVariableOccurrenceCaptures = {
  initializer: ts.Expression;
};
type InlineVariableOccurrenceData = undefined;

export class InlineVariableOccurrenceMatch
  implements
    Match<
      InlineVariableOccurrenceNode,
      InlineVariableOccurrenceCaptures,
      InlineVariableOccurrenceData
    >
{
  constructor(
    readonly node: InlineVariableOccurrenceNode,
    readonly captures: InlineVariableOccurrenceCaptures,
    readonly data: InlineVariableOccurrenceData,
    readonly context: Context
  ) {}
}
