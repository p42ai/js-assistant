
import ts from "typescript";

const flippedOperators = new Map<ts.BinaryOperator, ts.BinaryOperator>();

flippedOperators.set(
  ts.SyntaxKind.LessThanToken,
  ts.SyntaxKind.GreaterThanToken
);
flippedOperators.set(
  ts.SyntaxKind.GreaterThanToken,
  ts.SyntaxKind.LessThanToken
);
flippedOperators.set(
  ts.SyntaxKind.LessThanEqualsToken,
  ts.SyntaxKind.GreaterThanEqualsToken
);
flippedOperators.set(
  ts.SyntaxKind.GreaterThanEqualsToken,
  ts.SyntaxKind.LessThanEqualsToken
);
flippedOperators.set(
  ts.SyntaxKind.EqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsToken
);
flippedOperators.set(
  ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsEqualsToken
);
flippedOperators.set(
  ts.SyntaxKind.ExclamationEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken
);
flippedOperators.set(
  ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsEqualsToken
);

// boolean logic:
flippedOperators.set(
  ts.SyntaxKind.AmpersandAmpersandToken,
  ts.SyntaxKind.AmpersandAmpersandToken
);
flippedOperators.set(ts.SyntaxKind.BarBarToken, ts.SyntaxKind.BarBarToken);

// binary operators:
flippedOperators.set(
  ts.SyntaxKind.AmpersandToken,
  ts.SyntaxKind.AmpersandToken
);
flippedOperators.set(ts.SyntaxKind.CaretToken, ts.SyntaxKind.CaretToken);
flippedOperators.set(ts.SyntaxKind.BarToken, ts.SyntaxKind.BarToken);

// other operators:
flippedOperators.set(ts.SyntaxKind.AsteriskToken, ts.SyntaxKind.AsteriskToken);
flippedOperators.set(ts.SyntaxKind.PlusToken, ts.SyntaxKind.PlusToken);

export function flipOperator(operator: ts.BinaryOperator): ts.BinaryOperator {
  return flippedOperators.get(operator)!;
}

export const flippableOperators = Array.from(flippedOperators.keys());
