import ts from "typescript";
import * as p from "../predicate";
import * as b from "../builder";
import { Context } from "../engine/Context";

export function matchForStatement({
  initializer = undefined,
  condition = undefined,
  incrementor = undefined,
  statement = undefined,
  constraints = undefined,
  debugName = "forStatement",
}: {
  initializer?: p.OptionalPredicate<ts.ForInitializer | undefined, Context>;
  condition?: p.OptionalPredicate<ts.Expression | undefined, Context>;
  incrementor?: p.OptionalPredicate<ts.Expression | undefined, Context>;
  statement?: p.OptionalPredicate<ts.Statement, Context>;
  constraints?: p.OptionalPredicateArray<ts.ForStatement, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isForStatement,
    b.optionalProperty("initializer", initializer),
    b.optionalProperty("condition", condition),
    b.optionalProperty("incrementor", incrementor),
    b.mandatoryProperty("statement", statement),
    b.constraints(constraints)
  );
}
