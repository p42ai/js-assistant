import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchPropertyAccessExpression({
  expression = undefined,
  name = undefined,
  isOptional = undefined,
  constraints = undefined,
  debugName = "propertyAccessExpression",
}: {
  expression?: p.OptionalPredicate<ts.LeftHandSideExpression, Context>;
  name?: p.OptionalPredicate<ts.MemberName, Context>;
  isOptional?: p.PrimitivePredicateLike<boolean, Context>;
  constraints?: p.OptionalPredicateArray<ts.PropertyAccessExpression, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isPropertyAccessExpression,
    b.mandatoryExpression("expression", expression),
    b.mandatoryProperty("name", name),
    b.virtualNotNullProperty("isOptional", "questionDotToken", isOptional),
    b.constraints(constraints)
  );
}
