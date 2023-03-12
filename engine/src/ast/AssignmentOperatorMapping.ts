import ts from "typescript";

type AssignmentOperatorConfig = {
  regularOperator: ts.BinaryOperator;
  assignmentOperator: ts.BinaryOperator;
  isCommutative: boolean;
  isSafe: boolean;
};

const operatorConfigs: Array<AssignmentOperatorConfig> = [
  {
    regularOperator: ts.SyntaxKind.PlusToken,
    assignmentOperator: ts.SyntaxKind.PlusEqualsToken,
    isCommutative: true,
    isSafe: true,
  },
  {
    regularOperator: ts.SyntaxKind.AsteriskToken,
    assignmentOperator: ts.SyntaxKind.AsteriskEqualsToken,
    isCommutative: true,
    isSafe: true,
  },
  {
    regularOperator: ts.SyntaxKind.AsteriskAsteriskToken,
    assignmentOperator: ts.SyntaxKind.AsteriskAsteriskEqualsToken,
    isCommutative: false,
    isSafe: true,
  },
  {
    regularOperator: ts.SyntaxKind.SlashToken,
    assignmentOperator: ts.SyntaxKind.SlashEqualsToken,
    isCommutative: false,
    isSafe: true,
  },
  {
    regularOperator: ts.SyntaxKind.PercentToken,
    assignmentOperator: ts.SyntaxKind.PercentEqualsToken,
    isCommutative: false,
    isSafe: true,
  },
  {
    regularOperator: ts.SyntaxKind.MinusToken,
    assignmentOperator: ts.SyntaxKind.MinusEqualsToken,
    isCommutative: false,
    isSafe: true,
  },
  {
    regularOperator: ts.SyntaxKind.LessThanLessThanToken,
    assignmentOperator: ts.SyntaxKind.LessThanLessThanEqualsToken,
    isCommutative: false,
    isSafe: true,
  },
  {
    regularOperator: ts.SyntaxKind.GreaterThanGreaterThanToken,
    assignmentOperator: ts.SyntaxKind.GreaterThanGreaterThanEqualsToken,
    isCommutative: false,
    isSafe: true,
  },
  {
    regularOperator: ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken,
    assignmentOperator:
      ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
    isCommutative: false,
    isSafe: true,
  },
  {
    regularOperator: ts.SyntaxKind.AmpersandToken,
    assignmentOperator: ts.SyntaxKind.AmpersandEqualsToken,
    isCommutative: true,
    isSafe: true,
  },
  {
    regularOperator: ts.SyntaxKind.BarToken,
    assignmentOperator: ts.SyntaxKind.BarEqualsToken,
    isCommutative: true,
    isSafe: true,
  },
  {
    regularOperator: ts.SyntaxKind.CaretToken,
    assignmentOperator: ts.SyntaxKind.CaretEqualsToken,
    isCommutative: true,
    isSafe: true,
  },
  {
    regularOperator: ts.SyntaxKind.AmpersandAmpersandToken,
    assignmentOperator: ts.SyntaxKind.AmpersandAmpersandEqualsToken,
    isCommutative: false,
    isSafe: false,
  },
  {
    regularOperator: ts.SyntaxKind.BarBarToken,
    assignmentOperator: ts.SyntaxKind.BarBarEqualsToken,
    isCommutative: false,
    isSafe: false,
  },
  {
    regularOperator: ts.SyntaxKind.QuestionQuestionToken,
    assignmentOperator: ts.SyntaxKind.QuestionQuestionEqualsToken,
    isCommutative: false,
    isSafe: false,
  },
];

const regularOperatorToAssignmentOperator = new Map<
  ts.BinaryOperator,
  ts.BinaryOperator
>();

const assignmentOperatorToRegularOperator = new Map<
  ts.BinaryOperator,
  ts.BinaryOperator
>();

operatorConfigs.forEach((config) => {
  regularOperatorToAssignmentOperator.set(
    config.regularOperator,
    config.assignmentOperator
  );
  assignmentOperatorToRegularOperator.set(
    config.assignmentOperator,
    config.regularOperator
  );
});

const commutativeRegularOperators = operatorConfigs
  .filter((config) => config.isCommutative)
  .map((config) => config.regularOperator);

const regularOperators = operatorConfigs.map(
  (config) => config.regularOperator
);

const assignmentOperators = operatorConfigs.map(
  (config) => config.assignmentOperator
);

const safeOperators = operatorConfigs
  .filter((config) => config.isSafe)
  .flatMap((config) => [config.assignmentOperator, config.regularOperator]);

export class AssignmentOperatorMapping {
  static isConversionSafe(operator: ts.BinaryOperator) {
    return safeOperators.includes(operator);
  }

  static getAssignmentOperator(
    regularOperator: ts.BinaryOperator
  ): ts.BinaryOperator | undefined {
    return regularOperatorToAssignmentOperator.get(regularOperator);
  }

  static getAssignmentOperators(): Array<ts.BinaryOperator> {
    return assignmentOperators;
  }

  static getRegularOperator(
    assignmentOperator: ts.BinaryOperator
  ): ts.BinaryOperator | undefined {
    return assignmentOperatorToRegularOperator.get(assignmentOperator);
  }

  static getRegularOperators(): Array<ts.BinaryOperator> {
    return regularOperators;
  }

  static getCommutativeRegularOperators(): Array<ts.BinaryOperator> {
    return commutativeRegularOperators;
  }
}
