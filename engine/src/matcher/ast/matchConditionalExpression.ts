import ts from "typescript";
import * as p from "../predicate";
import * as b from "../builder";
import { Context } from "../engine/Context";

export function matchConditionalExpression({
  condition = undefined,
  whenTrue = undefined,
  whenFalse = undefined,
  constraints = undefined,
  debugName = "conditionalExpression",
}: {
  condition?: p.OptionalPredicate<ts.Expression, Context>;
  whenTrue?: p.OptionalPredicate<ts.Expression, Context>;
  whenFalse?: p.OptionalPredicate<ts.Expression, Context>;
  constraints?: p.OptionalPredicateArray<ts.ConditionalExpression, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isConditionalExpression,
    b.mandatoryExpression("condition", condition),
    b.mandatoryExpression("whenTrue", whenTrue),
    b.mandatoryExpression("whenFalse", whenFalse),
    b.constraints(constraints)
  );
}
