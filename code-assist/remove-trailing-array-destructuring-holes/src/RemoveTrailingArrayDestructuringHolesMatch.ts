
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type RemoveTrailingArrayDestructuringHolesNode = ts.ArrayBindingPattern;
type RemoveTrailingArrayDestructuringHolesCaptures = Record<string, never>;
type RemoveTrailingArrayDestructuringHolesData = {
  trailingOmittedExpressionCount: number;
};

export class RemoveTrailingArrayDestructuringHolesMatch
  implements
    Match<
      RemoveTrailingArrayDestructuringHolesNode,
      RemoveTrailingArrayDestructuringHolesCaptures,
      RemoveTrailingArrayDestructuringHolesData
    >
{
  constructor(
    readonly node: RemoveTrailingArrayDestructuringHolesNode,
    readonly captures: RemoveTrailingArrayDestructuringHolesCaptures,
    readonly data: RemoveTrailingArrayDestructuringHolesData,
    readonly context: Context
  ) {}

  get hasOnlyHoles(): boolean {
    return (
      this.node.elements.length === this.data.trailingOmittedExpressionCount
    );
  }
}
