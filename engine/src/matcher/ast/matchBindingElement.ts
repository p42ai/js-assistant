import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchBindingElement({
  name = undefined,
  propertyName = undefined,
  isRest = undefined,
  parent = undefined,
  constraints = undefined,
  debugName = "bindingElement",
}: {
  name?: p.OptionalPredicate<ts.BindingName, Context>;
  propertyName?: p.OptionalPredicate<ts.PropertyName | undefined, Context>;
  isRest?: p.PrimitivePredicateLike<boolean, Context>;
  parent?: p.OptionalPredicate<ts.BindingPattern, Context>;
  constraints?: p.OptionalPredicateArray<ts.BindingElement, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isBindingElement,
    b.mandatoryProperty("name", name),
    b.optionalProperty("propertyName", propertyName),
    b.virtualNotNullProperty("isRest", "dotDotDotToken", isRest),
    b.mandatoryProperty("parent", parent),
    b.constraints(constraints)
  );
}
