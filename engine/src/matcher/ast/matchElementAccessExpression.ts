import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchElementAccessExpression({
  expression = undefined,
  argumentExpression = undefined,
  isOptional = undefined,
  constraints = undefined,
  debugName = "elementAccessExpression",
}: {
  expression?: p.OptionalPredicate<ts.Expression, Context>;
  argumentExpression?: p.OptionalPredicate<ts.Expression, Context>;
  isOptional?: p.PrimitivePredicateLike<boolean, Context>;
  constraints?: p.OptionalPredicateArray<ts.ElementAccessExpression, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isElementAccessExpression,
    b.mandatoryProperty("expression", expression),
    b.mandatoryProperty("argumentExpression", argumentExpression),
    b.virtualNotNullProperty("isOptional", "questionDotToken", isOptional),
    b.constraints(constraints)
  );
}
