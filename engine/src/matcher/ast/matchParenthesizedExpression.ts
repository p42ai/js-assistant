import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";
import { Predicate } from "../predicate/Predicate";

export function matchParenthesizedExpression({
  expression = undefined,
  constraints = undefined,
  debugName = "parenthesizedExpression",
}: {
  expression?: Predicate<ts.Expression, Context>;
  constraints?: p.OptionalPredicateArray<ts.ParenthesizedExpression, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isParenthesizedExpression,
    b.mandatoryProperty("expression", expression),
    b.constraints(constraints)
  );
}
