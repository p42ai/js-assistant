import ts from "typescript";
import * as p from "../predicate";
import * as b from "../builder";
import { Context } from "../engine/Context";

export function matchOmittedExpression({
  parent = undefined,
  constraints = undefined,
  debugName = "omittedExpression",
}: {
  parent?: p.OptionalPredicate<ts.Node, Context>;
  constraints?: p.OptionalPredicateArray<ts.OmittedExpression, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isOmittedExpression,
    b.mandatoryProperty("parent", parent),
    b.constraints(constraints)
  );
}
