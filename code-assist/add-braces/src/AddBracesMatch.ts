import { Context, getId, Match, Range } from "@p42/engine";
import ts from "typescript";

type AddBracesNode =
  | ts.DoStatement
  | ts.IfStatement
  | ts.ForStatement
  | ts.ForOfStatement
  | ts.ForInStatement
  | ts.WhileStatement;

type AddBracesCaptures = {
  statement: ts.Statement | undefined;
};
type AddBracesData = undefined;

export type AddBracesType = {
  label: string;
  codeActionKindIndex: number;
  regularRange?: Range;
};

export class AddBracesMatch
  implements Match<AddBracesNode, AddBracesCaptures, AddBracesData>
{
  constructor(
    readonly node: AddBracesNode,
    readonly captures: AddBracesCaptures,
    readonly data: AddBracesData,
    readonly context: Context
  ) {}

  get typeForStatement(): AddBracesType {
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
