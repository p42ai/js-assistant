
import {
  ActionZone,
  IfStatement,
  predicates as p,
  Range,
  Safety,
  SafetyMessageList,
  Transformation,
  matchers as m,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { createRemoveBracesActionZones } from "./createRemoveBracesActionZones";
import { RemoveBracesMatch } from "./RemoveBracesMatch";

const { ast } = m;

export class RemoveBracesFromElseTransformation extends Transformation<RemoveBracesMatch> {
  constructor() {
    super("else");
  }

  isApplicable(match: RemoveBracesMatch): boolean {
    return ast.ifStatement({
      elseStatement: ast.singleStatementBlock({
        statement: p.isDefined(),
      }),
    })(match.node, match.context);
  }

  async apply(match: RemoveBracesMatch, tree: TransformedNodeTree) {
    const block = this.getElseStatement(match);
    tree.replace(block, block.statements[0]);
  }

  analyzeSafety(match: RemoveBracesMatch): Safety {
    const messages = new SafetyMessageList();
    return messages.produceSafe();
  }

  getActionZones(
    match: RemoveBracesMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    const elseStatement = this.getElseStatement(match);
    return createRemoveBracesActionZones(
      match,
      {
        label: "else",
        codeActionKindIndex: 1,
        getRegularRange(match) {
          return new Range(
            IfStatement.getElseKeyword(
              match.node as ts.IfStatement
            )!.getStart(),
            match.node.end
          );
        },
      },
      elseStatement
    );
  }

  private getElseStatement(match: RemoveBracesMatch) {
    return (match.node as ts.IfStatement).elseStatement! as ts.Block;
  }
}
