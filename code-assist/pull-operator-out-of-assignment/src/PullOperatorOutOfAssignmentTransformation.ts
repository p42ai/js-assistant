
import {
  ActionZone,
  AssignmentOperatorMapping,
  createActionZones,
  EditorOperation,
  NodeRange,
  Range,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { PullOperatorOutOfAssignmentCandidate } from "./PullOperatorOutOfAssignmentCandidate";

export class PullOperatorOutOfAssignmentTransformation extends Transformation<PullOperatorOutOfAssignmentCandidate> {
  async apply(
    match: PullOperatorOutOfAssignmentCandidate,
    tree: TransformedNodeTree
  ) {
    // In many cases, typescript automatically takes care of inserting the right parentheses.
    // However, there are exceptions:
    // * ternaries are lower precedence than binary ops (other than assignment)
    const operandReplacement = ts.isConditionalExpression(
      match.captures.operand
    )
      ? tree.createParenthesizedExpression({
          expression: match.captures.operand,
        })
      : match.captures.operand;

    const replacementExpression = tree.updateBinaryExpression(match.node, {
      operator: ts.SyntaxKind.EqualsToken,
      right: tree.createBinaryExpression({
        left: tree.copy(match.captures.targetExpression),
        operator: match.data.regularOperator,
        right: operandReplacement,
      }),
    });

    tree.replace(match.node, replacementExpression);

    return EditorOperation.compose(
      EditorOperation.highlightNodes(tree, [
        replacementExpression,
        (node) =>
          new Range(
            (node as ts.BinaryExpression).operatorToken.getStart(),
            node.end
          ),
      ])
    );
  }

  analyzeSafety(match: PullOperatorOutOfAssignmentCandidate): Safety {
    const messages = new SafetyMessageList();

    if (
      !AssignmentOperatorMapping.isConversionSafe(
        match.captures.assignmentOperator
      )
    ) {
      messages.warning(
        `${ts.tokenToString(
          match.captures.assignmentOperator
        )} short-circuits assignment`
      );
    }

    return messages.produceSafe();
  }

  getActionZones(
    match: PullOperatorOutOfAssignmentCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      `Pull out ${ts.tokenToString(match.data.regularOperator)}`,
      [
        {
          range: NodeRange.binaryExpressionOperator(match.node),
        },
      ]
    );
  }
}
