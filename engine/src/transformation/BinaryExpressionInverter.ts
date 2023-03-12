import ts from "typescript";
import { TransformedNodeTree } from "..";

export type BinaryExpressionInversion = {
  invertedOperator: ts.BinaryOperator;
  invertedArguments: boolean;
  isSafeForNullishAndNaN: boolean;
};

const inversions = new Map<ts.BinaryOperator, BinaryExpressionInversion>();

inversions.set(ts.SyntaxKind.AmpersandAmpersandToken, {
  invertedOperator: ts.SyntaxKind.BarBarToken,
  invertedArguments: true,
  isSafeForNullishAndNaN: true,
});
inversions.set(ts.SyntaxKind.BarBarToken, {
  invertedOperator: ts.SyntaxKind.AmpersandAmpersandToken,
  invertedArguments: true,
  isSafeForNullishAndNaN: true,
});
inversions.set(ts.SyntaxKind.EqualsEqualsToken, {
  invertedOperator: ts.SyntaxKind.ExclamationEqualsToken,
  invertedArguments: false,
  isSafeForNullishAndNaN: true,
});
inversions.set(ts.SyntaxKind.EqualsEqualsEqualsToken, {
  invertedOperator: ts.SyntaxKind.ExclamationEqualsEqualsToken,
  invertedArguments: false,
  isSafeForNullishAndNaN: true,
});
inversions.set(ts.SyntaxKind.ExclamationEqualsToken, {
  invertedOperator: ts.SyntaxKind.EqualsEqualsToken,
  invertedArguments: false,
  isSafeForNullishAndNaN: true,
});
inversions.set(ts.SyntaxKind.ExclamationEqualsEqualsToken, {
  invertedOperator: ts.SyntaxKind.EqualsEqualsEqualsToken,
  invertedArguments: false,
  isSafeForNullishAndNaN: true,
});
inversions.set(ts.SyntaxKind.GreaterThanEqualsToken, {
  invertedOperator: ts.SyntaxKind.LessThanToken,
  invertedArguments: false,
  isSafeForNullishAndNaN: false,
});
inversions.set(ts.SyntaxKind.GreaterThanToken, {
  invertedOperator: ts.SyntaxKind.LessThanEqualsToken,
  invertedArguments: false,
  isSafeForNullishAndNaN: false,
});
inversions.set(ts.SyntaxKind.LessThanEqualsToken, {
  invertedOperator: ts.SyntaxKind.GreaterThanToken,
  invertedArguments: false,
  isSafeForNullishAndNaN: false,
});
inversions.set(ts.SyntaxKind.LessThanToken, {
  invertedOperator: ts.SyntaxKind.GreaterThanEqualsToken,
  invertedArguments: false,
  isSafeForNullishAndNaN: false,
});

export const BinaryExpressionInverter = {
  getInversion(operator: ts.BinaryOperator): BinaryExpressionInversion {
    return inversions.get(operator)!;
  },

  invertExpression(
    tree: TransformedNodeTree,
    expression: ts.BinaryExpression,
    removeDoubleNegationInArguments = false
  ): ts.BinaryExpression {
    const operator = expression.operatorToken.kind;
    const inversion = this.getInversion(operator);

    function transformArgument(expression: ts.Expression) {
      if (!inversion.invertedArguments) {
        return expression;
      }

      if (
        removeDoubleNegationInArguments &&
        ts.isPrefixUnaryExpression(expression) &&
        expression.operator === ts.SyntaxKind.ExclamationToken
      ) {
        return expression.operand;
      }

      return tree.createPrefixUnaryExpression({
        operator: ts.SyntaxKind.ExclamationToken,
        operand: expression,
      });
    }

    return tree.updateBinaryExpression(expression, {
      left: transformArgument(expression.left),
      operator: inversion.invertedOperator,
      right: transformArgument(expression.right),
    });
  },
};
