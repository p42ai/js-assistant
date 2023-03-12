
import { Context, getId, Match, Range } from "@p42/engine";
import ts from "typescript";

type RemoveBracesNode =
  | ts.DoStatement
  | ts.IfStatement
  | ts.ForStatement
  | ts.ForOfStatement
  | ts.ForInStatement
  | ts.WhileStatement;

type RemoveBracesCaptures = {
  block: ts.Block | undefined;
  statement: ts.Statement | undefined;
};
type RemoveBracesData = undefined;

export type RemoveBracesType = {
  label: string;
  codeActionKindIndex: number;
  getRegularRange?: (match: RemoveBracesMatch) => Range;
};

export class RemoveBracesMatch
  implements Match<RemoveBracesNode, RemoveBracesCaptures, RemoveBracesData>
{
  constructor(
    readonly node: RemoveBracesNode,
    readonly captures: RemoveBracesCaptures,
    readonly data: RemoveBracesData,
    readonly context: Context
  ) {}

  get typeForStatement(): RemoveBracesType {
    const { node } = this;

    if (ts.isIfStatement(node)) {
      return {
        label: "if",
        codeActionKindIndex: 0,
      };
    } else if (ts.isWhileStatement(node)) {
      return {
        label: "while",
        codeActionKindIndex: 2,
      };
    } else if (
      ts.isForOfStatement(node) ||
      ts.isForInStatement(node) ||
      ts.isForStatement(node)
    ) {
      return {
        label: "for",
        codeActionKindIndex: 3,
      };
    } else if (ts.isDoStatement(node)) {
      return {
        label: "do",
        codeActionKindIndex: 4,
      };
    }

    throw new Error(`unsupported parent ${getId(node)}`);
  }
}
