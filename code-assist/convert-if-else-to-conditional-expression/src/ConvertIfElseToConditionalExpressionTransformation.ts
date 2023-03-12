import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  getIndicatorText,
  isConstantExpression,
  NodeRange,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertIfElseToConditionalExpressionMatch } from "./ConvertIfElseToConditionalExpressionMatch";

export class ConvertIfElseToConditionalExpressionTransformation extends Transformation<ConvertIfElseToConditionalExpressionMatch> {
  async apply(
    match: ConvertIfElseToConditionalExpressionMatch,
    tree: TransformedNodeTree
  ) {
    const type = match.captures.type;

    const conditionalExpression = tree.createConditionalExpression({
      condition: match.captures.ifStatement.expression,
      whenTrue: match.captures.whenTrue,
      whenFalse: match.captures.whenFalse,
    });

    if (type === "if-else-assignment") {
      const ifStatement = match.node;
      const { assignmentStatement } = match.captures;

      tree.replace(
        ifStatement,
        // render as block if part of if-else sequence:
        ts.isIfStatement(match.context.getTrueParent(ifStatement))
          ? tree.createBlock({
              statements: [assignmentStatement],
            })
          : assignmentStatement
      );

      const assignmentExpression =
        assignmentStatement.expression as ts.BinaryExpression;
      tree.replace(assignmentExpression.right, conditionalExpression);
      return;
    }

    switch (type) {
      case "if-else-return":
      case "if-return": {
        tree.replace(
          match.captures.ifStatement,
          tree.createReturnStatement({
            expression: conditionalExpression,
          })
        );

        if (type === "if-return") {
          tree.remove(match.captures.standaloneReturnStatement);
        }

        return;
      }

      case "declaration-if-assignment": {
        const variableDeclaration = match.captures.variableDeclaration;

        tree.replace(
          variableDeclaration,
          tree.updateVariableDeclaration(variableDeclaration, {
            initializer: conditionalExpression,
          })
        );

        tree.remove(match.node);

        return;
      }

      default: {
        const exhaustiveCheck: never = type;
        throw new Error(`Unexpected type: ${exhaustiveCheck}`);
      }
    }
  }

  analyzeSafety(match: ConvertIfElseToConditionalExpressionMatch) {
    const messages = new SafetyMessageList();

    if (match.captures.type === "if-else-assignment") {
      return messages.produceSafe();
    }

    if (
      match.captures.type === "declaration-if-assignment" &&
      !isConstantExpression(
        match.captures.variableDeclaration.initializer!,
        match.context
      )
    ) {
      messages.warning("changes initializer calls");
    }

    return messages.produceSafe();
  }

  getImpactedNodes(
    match: ConvertIfElseToConditionalExpressionMatch
  ): ts.Node[] {
    return match.captures.type === "declaration-if-assignment"
      ? [match.node, match.captures.variableDeclaration]
      : [match.node];
  }

  getSuggestion(
    match: ConvertIfElseToConditionalExpressionMatch,
    safety: Safety
  ): Suggestion | null {
    if (match.captures.type === "if-return") {
      return null;
    }

    if (match.captures.type === "declaration-if-assignment") {
      return {
        description: this.getDescription(match),
        highlightRanges: [
          NodeRange.node(match.captures.variableDeclaration),
          NodeRange.node(match.node),
        ],
      };
    }

    const notPartOfIfElseSequence = !ts.isIfStatement(
      match.context.getTrueParent(match.node)
    );
    const noTernaryOnLeft = !ts.isConditionalExpression(
      match.captures.whenTrue
    );
    const noTernaryOnRight = !ts.isConditionalExpression(
      match.captures.whenFalse
    );

    if (!notPartOfIfElseSequence || !noTernaryOnLeft || !noTernaryOnRight) {
      return null;
    }

    return {
      description: this.getDescription(match),
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  private getDescription(
    match: ConvertIfElseToConditionalExpressionMatch
  ): string {
    const type = match.captures.type;
    switch (type) {
      case "if-else-return":
      case "if-return":
        return "You can combine two return statements with a conditional expression.";
      case "if-else-assignment":
        return `You can combine two assignment statements '${getIndicatorText(
          match.captures.assignmentTarget
        )} ${ts.tokenToString(
          match.captures.assignmentOperator
        )} ...' with a conditional expression.`;
      case "declaration-if-assignment":
        return "You can use a conditional expression to initialize the variable.";
      default: {
        const exhaustiveCheck: never = type;
        throw new Error(`Unexpected type: ${exhaustiveCheck}`);
      }
    }
  }

  getActionZones(
    match: ConvertIfElseToConditionalExpressionMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    const ranges = [
      {
        range: NodeRange.node(match.captures.ifStatement),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ];

    if (match.captures.type === "if-return") {
      ranges.push({
        range: NodeRange.node(match.captures.standaloneReturnStatement),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      });
    }

    if (match.captures.type === "declaration-if-assignment") {
      ranges.push({
        range: NodeRange.node(match.captures.variableDeclaration.parent.parent),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      });
    }

    return createActionZones("Convert to conditional expression", ranges);
  }
}
