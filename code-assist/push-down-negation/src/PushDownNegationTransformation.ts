
import {
  ActionZone,
  BinaryExpressionInverter,
  BinaryOperator,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { PushDownNegationCandidate } from "./PushDownNegationCandidate";

export class PushDownNegationTransformation extends Transformation<PushDownNegationCandidate> {
  async apply(match: PushDownNegationCandidate, tree: TransformedNodeTree) {
    const { binaryExpression } = match.captures;
    const { node } = match;
    const { parent } = node;

    // using special logic for preserving parentheses to
    // a) reuse existing node (which can have whitespace and comments)
    // b) make result easier to understand

    const shouldPreserveParentheses =
      ts.isPrefixUnaryExpression(parent) ||
      (ts.isBinaryExpression(parent) &&
        BinaryOperator.isPrecedenceGreaterThanAssignment(
          parent.operatorToken.kind
        ));

    const invertedExpression = BinaryExpressionInverter.invertExpression(
      tree,
      binaryExpression
    );

    tree.replace(
      node,
      shouldPreserveParentheses
        ? tree.updateParenthesizedExpression(
            node.operand as ts.ParenthesizedExpression,
            {
              expression: invertedExpression,
            }
          )
        : invertedExpression
    );
  }

  analyzeSafety(match: PushDownNegationCandidate): Safety {
    const { operator } = match.captures;
    const info = BinaryExpressionInverter.getInversion(operator);

    return info.isSafeForNullishAndNaN
      ? Safety.safe()
      : Safety.warning("can affect behavior for nullish and NaN values");
  }

  getSuggestion(
    match: PushDownNegationCandidate,
    safety: Safety
  ): Suggestion | null {
    if (!this.isSuggestion(match)) {
      return null;
    }

    const { operator } = match.captures;
    const info = BinaryExpressionInverter.getInversion(operator);

    return {
      description: `You can push the negation into the ${ts.tokenToString(
        operator
      )} operator and convert it into a ${ts.tokenToString(
        info.invertedOperator
      )} operator.`,
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  private isSuggestion(match: PushDownNegationCandidate): boolean {
    switch (match.captures.operator) {
      case ts.SyntaxKind.ExclamationEqualsEqualsToken:
      case ts.SyntaxKind.ExclamationEqualsToken:
      case ts.SyntaxKind.EqualsEqualsEqualsToken:
      case ts.SyntaxKind.EqualsEqualsToken:
      case ts.SyntaxKind.GreaterThanEqualsToken:
      case ts.SyntaxKind.GreaterThanToken:
      case ts.SyntaxKind.LessThanEqualsToken:
      case ts.SyntaxKind.LessThanToken:
        return true;
      case ts.SyntaxKind.AmpersandAmpersandToken:
      case ts.SyntaxKind.BarBarToken:
      default:
        return false;
    }
  }

  getActionZones(
    match: PushDownNegationCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Push down negation", [
      {
        range: NodeRange.prefixUnaryExpression(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
