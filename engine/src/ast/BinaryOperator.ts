import ts from "typescript";
import { getSyntaxKindLabel } from "./getSyntaxKindLabel";

const ASSIGNMENT_PRECEDENCE = 3;

export class BinaryOperator {
  readonly operatorKind: ts.BinaryOperator;
  readonly isShortCircuiting: boolean;
  readonly isAssignment: boolean;

  /**
   * Operator precedence for binary operators as a number. From the table in
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
   */
  readonly precedence: number;
  readonly associativity: "left-to-right" | "right-to-left";

  static get(operatorKind: ts.BinaryOperator): BinaryOperator {
    // result is never undefined because all binary operators are registered
    return syntaxKindToOperator.get(operatorKind)!;
  }

  static isShortCircuiting(operatorKind: ts.BinaryOperator) {
    return BinaryOperator.get(operatorKind).isShortCircuiting;
  }

  static isAssignment(operatorKind: ts.BinaryOperator) {
    return BinaryOperator.get(operatorKind).isAssignment;
  }

  static getPrecedence(operatorKind: ts.BinaryOperator) {
    return BinaryOperator.get(operatorKind).precedence;
  }

  static isPrecedenceGreaterThanAssignment(operatorKind: ts.BinaryOperator) {
    return BinaryOperator.getPrecedence(operatorKind) > ASSIGNMENT_PRECEDENCE;
  }

  constructor({
    operatorKind,
    isShortCircuiting = false,
    isAssignment = false,
    precedence,
    associativity,
  }: {
    operatorKind: ts.BinaryOperator;
    isShortCircuiting?: boolean;
    isAssignment?: boolean;
    precedence: number;
    associativity: "left-to-right" | "right-to-left";
  }) {
    this.operatorKind = operatorKind;
    this.isShortCircuiting = isShortCircuiting;
    this.isAssignment = isAssignment;
    this.precedence = precedence;
    this.associativity = associativity;
  }
}

const syntaxKindToOperator = new Map<ts.SyntaxKind, BinaryOperator>();

function registerBinaryOperator(values: {
  operatorKind: ts.BinaryOperator;
  isShortCircuiting?: boolean;
  isAssignment?: boolean;
  precedence: number;
  associativity: "left-to-right" | "right-to-left";
}) {
  const { operatorKind } = values;

  if (syntaxKindToOperator.has(operatorKind)) {
    throw new Error(
      `operator kind ${getSyntaxKindLabel(operatorKind)} is already registered`
    );
  }
  syntaxKindToOperator.set(operatorKind, new BinaryOperator(values));
}

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.AsteriskAsteriskToken,
  precedence: 16,
  associativity: "right-to-left",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.AsteriskToken,
  precedence: 15,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.SlashToken,
  precedence: 15,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.PercentToken,
  precedence: 15,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.PlusToken,
  precedence: 14,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.MinusToken,
  precedence: 14,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.LessThanLessThanToken,
  precedence: 13,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.GreaterThanGreaterThanToken,
  precedence: 13,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken,
  precedence: 13,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.LessThanToken,
  precedence: 12,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.LessThanEqualsToken,
  precedence: 12,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.GreaterThanToken,
  precedence: 12,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.GreaterThanEqualsToken,
  precedence: 12,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.InKeyword,
  precedence: 12,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.InstanceOfKeyword,
  precedence: 12,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.EqualsEqualsToken,
  precedence: 11,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.ExclamationEqualsToken,
  precedence: 11,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.EqualsEqualsEqualsToken,
  precedence: 11,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.ExclamationEqualsEqualsToken,
  precedence: 11,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.AmpersandToken,
  precedence: 10,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.CaretToken,
  precedence: 9,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.BarToken,
  precedence: 8,
  associativity: "left-to-right",
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.AmpersandAmpersandToken,
  precedence: 7,
  associativity: "left-to-right",
  isShortCircuiting: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.BarBarToken,
  precedence: 6,
  associativity: "left-to-right",
  isShortCircuiting: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.QuestionQuestionToken,
  precedence: 5,
  associativity: "left-to-right",
  isShortCircuiting: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.EqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.PlusEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.MinusEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.AsteriskAsteriskEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.AsteriskEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.SlashEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.PercentEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.LessThanLessThanEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.GreaterThanGreaterThanEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.AmpersandEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.CaretEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.BarEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.AmpersandAmpersandEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isShortCircuiting: true,
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.BarBarEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isShortCircuiting: true,
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.QuestionQuestionEqualsToken,
  precedence: ASSIGNMENT_PRECEDENCE,
  associativity: "right-to-left",
  isShortCircuiting: true,
  isAssignment: true,
});

registerBinaryOperator({
  operatorKind: ts.SyntaxKind.CommaToken,
  precedence: 1,
  associativity: "left-to-right",
});
