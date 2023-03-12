
import {
  ActionZone,
  createActionZones,
  factory,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { SplitIfCandidate } from "./SplitIfCandidate";

export class SplitOrIntoElseIfTransformation extends Transformation<SplitIfCandidate> {
  readonly id = "split-or-into-else-if";

  isApplicable(match: SplitIfCandidate): boolean {
    const { operator } = match.captures;
    return operator === ts.SyntaxKind.BarBarToken;
  }

  async apply(match: SplitIfCandidate, tree: TransformedNodeTree) {
    const { ifStatement } = match.captures;
    const target = match.node;

    tree.replace(
      ifStatement,
      tree.updateIfStatement(ifStatement, {
        expression: factory.copyShallow(target.left, tree),
        elseStatement: tree.createIfStatement({
          expression: ifStatement.expression,
          thenStatement: factory.copyShallow(ifStatement.thenStatement, tree),
          elseStatement: ifStatement.elseStatement,
        }),
      })
    );
    tree.replace(target, target.right);
  }

  analyzeSafety(match: SplitIfCandidate): Safety {
    return Safety.safe();
  }

  getActionZones(match: SplitIfCandidate, isSuggestion: boolean): ActionZone[] {
    return createActionZones("Split into else-if", [
      {
        range: NodeRange.binaryExpressionOperator(match.node),
      },
    ]);
  }
}
