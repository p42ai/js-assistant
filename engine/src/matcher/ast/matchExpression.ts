import ts from "typescript";
import { isExpression } from "../../ast/Expression";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchExpression({
  parent = undefined,
  constraints = undefined,
}: {
  parent?: p.OptionalPredicate<ts.Node, Context>;
  constraints?: p.OptionalPredicateArray<ts.Expression, Context>;
} = {}) {
  return b.object(
    "expression",
    isExpression,
    b.mandatoryProperty("parent", parent),
    b.constraints(constraints)
  );
}
