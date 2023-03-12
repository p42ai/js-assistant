import ts from "typescript";
import { BinaryOperator } from "../../ast/BinaryOperator";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";
import { define } from "../predicate/predicate-wrapper";

export function matchAssignmentExpression({
  operator = undefined,
  left = undefined,
  right = undefined,
  constraints = undefined,
  debugName = "assignmentExpression",
}: {
  operator?: p.PrimitivePredicateLike<ts.AssignmentOperator, Context>;
  left?: p.OptionalPredicate<ts.Expression, Context>;
  right?: p.OptionalPredicate<ts.Expression, Context>;
  constraints?: p.OptionalPredicateArray<ts.BinaryExpression, Context>;
  debugName?: string;
} = {}) {
  const operatorPredicate =
    operator != null
      ? (p.toPrimitivePredicate(operator) as p.Predicate<
          ts.BinaryOperator,
          Context
        >)
      : (operatorKind: ts.BinaryOperator) =>
          BinaryOperator.isAssignment(operatorKind);

  return matchBinaryExpression({
    operator: operatorPredicate,
    left,
    right,
    constraints,
    debugName,
  });
}

export function matchBinaryExpressionWithoutOrder({
  operator = undefined,
  part1 = undefined,
  part2 = undefined,
  constraints = undefined,
  debugName = "binaryExpressionWithoutOrder",
}: {
  operator?: p.PrimitivePredicateLike<ts.BinaryOperator, Context>;
  part1?: p.OptionalPredicate<ts.Expression, Context>;
  part2?: p.OptionalPredicate<ts.Expression, Context>;
  constraints?: p.OptionalPredicateArray<ts.BinaryExpression, Context>;
  debugName?: string;
} = {}) {
  return define(
    debugName,
    p.or(
      matchBinaryExpression({
        operator,
        left: part1,
        right: part2,
        constraints,
      }),
      matchBinaryExpression({
        operator,
        left: part2,
        right: part1,
        constraints,
      })
    )
  );
}

export function matchBinaryExpression({
  operator = undefined,
  left = undefined,
  right = undefined,
  constraints = undefined,
  debugName = "binaryExpression",
}: {
  operator?: p.PrimitivePredicateLike<ts.BinaryOperator, Context>;
  left?: p.OptionalPredicate<ts.Expression, Context>;
  right?: p.OptionalPredicate<ts.Expression, Context>;
  constraints?: p.OptionalPredicateArray<ts.BinaryExpression, Context>;
  debugName?: string;
} = {}) {
  const operatorPredicate = p.toPrimitivePredicate(operator);
  return b.object(
    debugName,
    ts.isBinaryExpression,
    // operator first to optimize performance:
    operatorPredicate != null
      ? define("operator", (value, context) =>
          operatorPredicate(value.operatorToken.kind, context)
        )
      : undefined,
    b.mandatoryProperty("left", left),
    b.mandatoryProperty("right", right),
    b.constraints(constraints)
  );
}
