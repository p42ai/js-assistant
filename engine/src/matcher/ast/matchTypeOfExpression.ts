import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchTypeOfExpression({
  expression = undefined,
  constraints = undefined,
  debugName = "typeOfExpression",
}: {
  expression?: p.OptionalPredicate<ts.Expression, Context>;
  constraints?: p.OptionalPredicateArray<ts.TypeOfExpression, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isTypeOfExpression,
    b.mandatoryExpression("expression", expression),
    b.constraints(constraints)
  );
}
