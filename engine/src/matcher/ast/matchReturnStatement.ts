import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchReturnStatement({
  expression = undefined,
  constraints = undefined,
  debugName = "returnStatement",
}: {
  expression?: p.OptionalPredicate<ts.Expression | undefined, Context>;
  constraints?: p.OptionalPredicateArray<ts.ReturnStatement, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isReturnStatement,
    b.optionalProperty("expression", expression),
    b.constraints(constraints)
  );
}
