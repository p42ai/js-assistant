
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { InsertConsoleLogCandidate } from "./InsertConsoleLogCandidate";

export class InsertConsoleLogTransformation extends Transformation<InsertConsoleLogCandidate> {
  async apply(match: InsertConsoleLogCandidate, tree: TransformedNodeTree) {
    const statement = match.data.statementAncestor;

    tree.insertStatementsAfter(
      statement,
      tree.createExpressionStatement({
        expression: tree.createCallExpression({
          expression: tree.createPropertyAccessExpression({
            expression: tree.createIdentifier({
              text: "console",
            }),
            name: tree.createIdentifier({
              text: "log",
            }),
          }),
          argumentsArray: [
            tree.createIdentifier({
              text: match.node.text,
            }),
          ],
        }),
      })
    );
  }

  getActionZones(
    match: InsertConsoleLogCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Insert console.log", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.Regular,
      },
    ]);
  }
}
