import ts from "typescript";
import { ast } from "../../matcher";
import { Context } from "../../matcher/engine/Context";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";

// only converting ===, !==, ==, != since
// converting <, <= etc is unsafe (changes results for NaN, undefined etc)
const operatorMap = new Map<ts.BinaryOperator, ts.BinaryOperator>();
operatorMap.set(
  ts.SyntaxKind.EqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken
);
operatorMap.set(
  ts.SyntaxKind.ExclamationEqualsToken,
  ts.SyntaxKind.EqualsEqualsToken
);
operatorMap.set(
  ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsEqualsToken
);
operatorMap.set(
  ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsEqualsToken
);

export function negateExpression(
  expression: ts.Expression,
  tree: TransformedNodeTree,
  context: Context
): ts.Expression {
  if (
    ast.prefixUnaryExpression({
      operator: ts.SyntaxKind.ExclamationToken,
    })(expression, context)
  ) {
    return (expression as ts.PrefixUnaryExpression).operand;
  }

  if (
    ast.binaryExpression({
      operator: [
        ts.SyntaxKind.EqualsEqualsToken,
        ts.SyntaxKind.ExclamationEqualsToken,
        ts.SyntaxKind.EqualsEqualsEqualsToken,
        ts.SyntaxKind.ExclamationEqualsEqualsToken,
      ],
    })(expression, context)
  ) {
    const binaryExpression = expression as ts.BinaryExpression;
    return tree.updateBinaryExpression(binaryExpression, {
      operator: operatorMap.get(binaryExpression.operatorToken.kind)!,
    });
  }

  return tree.createPrefixUnaryExpression({
    operator: ts.SyntaxKind.ExclamationToken,
    operand: expression,
  });
}
