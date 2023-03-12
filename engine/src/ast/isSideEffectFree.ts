import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { isLiteralLike } from "./isLiteralLike";

/**
 * @param expression
 * @param onlyLiterals
 *        When true, variables will cause this function to return false.
 *        TODO split into semantically more meaningful method (isConstantExpression).
 */
export function isSideEffectFree(
  expression: ts.Expression,
  context: Context,
  onlyLiterals = false // set to true for isConstantExpression
): boolean {
  if (isLiteralLike(expression, context)) {
    return true;
  }

  switch (expression.kind) {
    case ts.SyntaxKind.ConditionalExpression: {
      const conditionalExpression = expression as ts.ConditionalExpression;

      return (
        isSideEffectFree(
          conditionalExpression.condition,
          context,
          onlyLiterals
        ) &&
        isSideEffectFree(
          conditionalExpression.whenTrue,
          context,
          onlyLiterals
        ) &&
        isSideEffectFree(conditionalExpression.whenFalse, context, onlyLiterals)
      );
    }

    case ts.SyntaxKind.BinaryExpression: {
      const binaryExpression = expression as ts.BinaryExpression;

      if (
        [
          ts.SyntaxKind.AmpersandToken,
          ts.SyntaxKind.AmpersandAmpersandToken,
          ts.SyntaxKind.AsteriskToken,
          ts.SyntaxKind.AsteriskAsteriskToken,
          ts.SyntaxKind.BarToken,
          ts.SyntaxKind.BarBarToken,
          ts.SyntaxKind.CaretToken,
          ts.SyntaxKind.EqualsEqualsToken,
          ts.SyntaxKind.EqualsEqualsEqualsToken,
          ts.SyntaxKind.ExclamationEqualsToken,
          ts.SyntaxKind.ExclamationEqualsEqualsToken,
          ts.SyntaxKind.GreaterThanToken,
          ts.SyntaxKind.GreaterThanEqualsToken,
          ts.SyntaxKind.GreaterThanGreaterThanToken,
          ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken,
          ts.SyntaxKind.LessThanToken,
          ts.SyntaxKind.LessThanEqualsToken,
          ts.SyntaxKind.LessThanLessThanToken,
          ts.SyntaxKind.MinusToken,
          ts.SyntaxKind.PercentToken,
          ts.SyntaxKind.PlusToken,
          ts.SyntaxKind.QuestionQuestionToken,
          ts.SyntaxKind.SlashToken,
        ].includes(binaryExpression.operatorToken.kind)
      ) {
        return (
          isSideEffectFree(binaryExpression.left, context, onlyLiterals) &&
          isSideEffectFree(binaryExpression.right, context, onlyLiterals)
        );
      }

      return false;
    }

    case ts.SyntaxKind.ParenthesizedExpression: {
      const parenthesizedExpression = expression as ts.ParenthesizedExpression;

      return isSideEffectFree(
        parenthesizedExpression.expression,
        context,
        onlyLiterals
      );
    }

    case ts.SyntaxKind.PrefixUnaryExpression: {
      const prefixUnaryExpression = expression as ts.PrefixUnaryExpression;

      if (
        [
          ts.SyntaxKind.TildeToken,
          ts.SyntaxKind.ExclamationToken,
          ts.SyntaxKind.MinusToken,
        ].includes(prefixUnaryExpression.operator)
      ) {
        return isSideEffectFree(
          prefixUnaryExpression.operand,
          context,
          onlyLiterals
        );
      }

      return false;
    }

    case ts.SyntaxKind.Identifier: {
      if (onlyLiterals) {
        return false;
      }

      const identifier = expression as ts.Identifier;
      const bindingReference = context.getBindingReference(identifier);
      const binding = bindingReference?.binding;

      return (
        // assuming binding augmentation:
        binding != null &&
        // global identifiers can have side effects:
        !binding.isGlobal &&
        // when there is a with statement in the chain,
        // any identifier could have side-effects:
        !bindingReference!.isAffectedByWith
      );
    }

    default:
      return false;
  }
}
