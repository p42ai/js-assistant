import {
  ActionZone,
  IfStatement,
  NodeRange,
  Range,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { AddBracesMatch } from "./AddBracesMatch";
import { createAddBracesActionZones } from "./createAddBracesActionZones";
import { wrapInBlock } from "./wrapInBlock";

export class AddBracesToElseTransformation extends Transformation<AddBracesMatch> {
  constructor() {
    super("else");
  }

  isApplicable({ node }: AddBracesMatch): boolean {
    return (
      ts.isIfStatement(node) &&
      node.elseStatement != null &&
      !ts.isBlock(node.elseStatement)
    );
  }

  async apply(match: AddBracesMatch, tree: TransformedNodeTree) {
    wrapInBlock(this.getElseStatement(match), tree);
  }

  analyzeSafety(match: AddBracesMatch): Safety {
    const messages = new SafetyMessageList();
    return messages.produceSafe();
  }

  getActionZones(match: AddBracesMatch, isSuggestion: boolean): ActionZone[] {
    const elseStatement = this.getElseStatement(match);
    const isElseIf = ts.isIfStatement(elseStatement);
    const elseKeyword = IfStatement.getElseKeyword(
      match.node as ts.IfStatement
    )!;

    return createAddBracesActionZones(
      match,
      {
        label: "else",
        codeActionKindIndex: 1,
        regularRange: isElseIf
          ? NodeRange.node(elseKeyword)
          : new Range(elseKeyword.getStart(), match.node.end),
      },
      elseStatement,
      !isElseIf
    );
  }

  private getElseStatement(match: AddBracesMatch) {
    return (match.node as ts.IfStatement).elseStatement!;
  }
}
