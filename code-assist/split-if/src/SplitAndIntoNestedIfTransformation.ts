
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

export class SplitAndIntoNestedIfTransformation extends Transformation<SplitIfCandidate> {
  readonly id = "split-and-into-nested-if";

  isApplicable(match: SplitIfCandidate): boolean {
    return match.captures.operator === ts.SyntaxKind.AmpersandAmpersandToken;
  }

  async apply(
    { captures: { ifStatement }, node: target }: SplitIfCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(
      ifStatement,
      tree.updateIfStatement(ifStatement, {
        expression: factory.copyShallow(target.left, tree),
        thenStatement: tree.createBlock({
          statements: [
            tree.createIfStatement({
              expression: ifStatement.expression,
              thenStatement: ifStatement.thenStatement,
            }),
          ],
        }),
      })
    );
    tree.replace(target, target.right);
  }

  analyzeSafety(match: SplitIfCandidate): Safety {
    const { ifStatement } = match.captures;

    if (ifStatement.elseStatement != null) {
      return Safety.error("changes when else statement is executed");
    }

    return Safety.safe();
  }

  getActionZones(match: SplitIfCandidate, isSuggestion: boolean): ActionZone[] {
    return createActionZones(
      "Split into nested if",
      [
        {
          range: NodeRange.binaryExpressionOperator(match.node),
        },
      ],
      0
    );
  }
}
