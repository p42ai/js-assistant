
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

export class SplitAndIntoNestedIfAndDuplicateElseTransformation extends Transformation<SplitIfCandidate> {
  readonly id = "split-and-into-nested-if-with-duplicate-else";

  isApplicable(match: SplitIfCandidate): boolean {
    return (
      match.captures.operator === ts.SyntaxKind.AmpersandAmpersandToken &&
      match.captures.ifStatement.elseStatement != null
    );
  }

  async apply(match: SplitIfCandidate, tree: TransformedNodeTree) {
    const { ifStatement } = match.captures;
    const target = match.node;

    tree.replace(
      ifStatement,
      tree.updateIfStatement(ifStatement, {
        expression: target.left,
        thenStatement: tree.createBlock({
          statements: [
            tree.createIfStatement({
              expression: ifStatement.expression,
              thenStatement: ifStatement.thenStatement,
              elseStatement: factory.copyShallow(
                ifStatement.elseStatement!,
                tree
              ),
            }),
          ],
        }),
      })
    );
    tree.replace(target, target.right);
  }

  analyzeSafety(match: SplitIfCandidate): Safety {
    return Safety.safe();
  }

  getActionZones(match: SplitIfCandidate, isSuggestion: boolean): ActionZone[] {
    return createActionZones(
      "Split into nested if and duplicate else",
      [
        {
          range: NodeRange.binaryExpressionOperator(match.node),
        },
      ],
      1
    );
  }
}
