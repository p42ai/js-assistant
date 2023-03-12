import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchUpdateExpression({
  operator = undefined,
  operand = undefined,
  constraints = undefined,
  debugName = "updateExpression",
}: {
  operator?: p.PrimitivePredicateLike<
    ts.SyntaxKind.PlusPlusToken | ts.SyntaxKind.MinusMinusToken,
    Context
  >;
  operand?: p.OptionalPredicate<ts.Expression, Context>;
  constraints?: p.OptionalPredicateArray<
    ts.PrefixUnaryExpression | ts.PostfixUnaryExpression,
    Context
  >;
  debugName?: string;
} = {}) {
  const operatorMatcher = p.toPrimitivePredicate(
    operator ?? [ts.SyntaxKind.PlusPlusToken, ts.SyntaxKind.MinusMinusToken]
  ) as p.Predicate<ts.PostfixUnaryOperator | ts.PrefixUnaryOperator, Context>;

  return b.object(
    debugName,
    (
      node: ts.Node
    ): node is ts.PrefixUnaryExpression | ts.PostfixUnaryExpression =>
      ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node),
    b.mandatoryPrimitiveProperty("operator", operatorMatcher),
    b.mandatoryPrimitiveProperty("operand", operand),
    b.constraints(constraints)
  );
}

export function matchPrefixUnaryExpression({
  operator = undefined,
  operand = undefined,
  constraints = undefined,
  debugName = "prefixUnaryExpression",
}: {
  operator?: p.PrimitivePredicateLike<ts.PrefixUnaryOperator, Context>;
  operand?: p.OptionalPredicate<ts.Expression, Context>;
  constraints?: p.OptionalPredicateArray<ts.PrefixUnaryExpression, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isPrefixUnaryExpression,
    b.mandatoryPrimitiveProperty("operator", operator),
    b.mandatoryPrimitiveProperty("operand", operand),
    b.constraints(constraints)
  );
}

export function matchPostfixUnaryExpression({
  operator = undefined,
  operand = undefined,
  constraints = undefined,
  debugName = "postfixUnaryExpression",
}: {
  operator?: p.PrimitivePredicateLike<ts.PostfixUnaryOperator, Context>;
  operand?: p.OptionalPredicate<ts.Expression, Context>;
  constraints?: p.OptionalPredicateArray<ts.PostfixUnaryExpression, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isPostfixUnaryExpression,
    b.mandatoryPrimitiveProperty("operator", operator),
    b.mandatoryPrimitiveProperty("operand", operand),
    b.constraints(constraints)
  );
}
