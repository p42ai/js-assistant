
import {
  ActionZone,
  AssignmentOperatorMapping,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  NodeRange,
  Range,
  Safety,
  SafetyMessageList,
  Suggestion,
  matchers as m,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { ast } from "@p42/engine/build/matcher";
import ts from "typescript";
import { PushOperatorIntoAssignmentCandidate } from "./PushOperatorIntoAssignmentCandidate";

export class PushOperatorIntoAssignmentTransformation extends Transformation<PushOperatorIntoAssignmentCandidate> {
  async apply(
    match: PushOperatorIntoAssignmentCandidate,
    tree: TransformedNodeTree
  ) {
    const replacementExpression = tree.updateBinaryExpression(match.node, {
      operator: match.data.assignmentOperator,
      right: match.captures.operand,
    });

    tree.replace(match.node, replacementExpression);

    return EditorOperation.compose(
      EditorOperation.highlightNodes(tree, [
        replacementExpression,
        (node) => NodeRange.node((node as ts.BinaryExpression).operatorToken),
      ])
    );
  }

  analyzeSafety(match: PushOperatorIntoAssignmentCandidate): Safety {
    const messages = new SafetyMessageList();

    if (
      !AssignmentOperatorMapping.isConversionSafe(
        match.captures.regularOperator
      )
    ) {
      messages.warning(
        `${ts.tokenToString(
          match.data.assignmentOperator
        )} short-circuits assignment`
      );
    }

    return messages.produceSafe();
  }

  getSuggestion(match: PushOperatorIntoAssignmentCandidate): Suggestion | null {
    const { regularOperator } = match.captures;

    if (!AssignmentOperatorMapping.isConversionSafe(regularOperator)) {
      return null;
    }

    // ++ / -- is suggested when change is by 1:
    if (
      (regularOperator === ts.SyntaxKind.PlusToken ||
        regularOperator === ts.SyntaxKind.MinusToken) &&
      m.ast.numericLiteral({ text: "1" })(match.captures.operand, match.context)
    ) {
      return null;
    }

    const innerOperator = (match.node.right as ts.BinaryExpression)
      .operatorToken;

    return {
      description: `You can push the ${ts.tokenToString(
        regularOperator
      )} operator into the assignment with ${ts.tokenToString(
        match.data.assignmentOperator
      )}.`,
      highlightRanges: match.captures.isOperandFirst
        ? [
            new Range(match.node.getStart(), match.node.operatorToken.end),
            new Range(innerOperator.getStart(), match.node.right.end),
          ]
        : [new Range(match.node.getStart(), innerOperator.end)],
    };
  }

  getActionZones(
    match: PushOperatorIntoAssignmentCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      `Push ${ts.tokenToString(
        match.captures.regularOperator
      )} into assignment`,
      [
        {
          range: NodeRange.node(match.node.operatorToken),
          level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
        },
        {
          range: new Range(
            match.node.left.getStart(),
            (match.node.right as ts.BinaryExpression).operatorToken.getEnd()
          ),
        },
      ]
    );
  }
}
