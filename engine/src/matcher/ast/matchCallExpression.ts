import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchCallExpression({
  expression = undefined,
  args = undefined,
  isOptional = undefined,
  parent = undefined,
  constraints = undefined,
  debugName = "callExpression",
}: {
  expression?: p.OptionalPredicate<ts.LeftHandSideExpression, Context>;
  args?: p.OptionalPredicate<ts.NodeArray<ts.Expression>, Context>;
  isOptional?: p.PrimitivePredicateLike<boolean, Context>;
  parent?: p.OptionalPredicate<ts.Node, Context>;
  constraints?: p.OptionalPredicateArray<ts.CallExpression, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isCallExpression,
    b.mandatoryExpression("expression", expression),
    b.mandatoryProperty("arguments", args),
    b.virtualNotNullProperty("isOptional", "questionDotToken", isOptional),
    b.mandatoryProperty("parent", parent),
    b.constraints(constraints)
  );
}
