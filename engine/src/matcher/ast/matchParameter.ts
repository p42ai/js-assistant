import ts from "typescript";
import * as p from "../predicate";
import * as b from "../builder";
import { Context } from "../engine/Context";

export function matchParameter({
  name = undefined,
  type = undefined,
  initializer = undefined,
  constraints = undefined,
  debugName = "parameter",
}: {
  name?: p.OptionalPredicate<ts.BindingName, Context>;
  type?: p.OptionalPredicate<ts.TypeNode | undefined, Context>;
  initializer?: p.OptionalPredicate<ts.Expression | undefined, Context>;
  constraints?: p.OptionalPredicateArray<ts.ParameterDeclaration, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isParameter,
    b.mandatoryProperty("name", name),
    b.optionalProperty("type", type),
    b.optionalProperty("initializer", initializer),
    b.constraints(constraints)
  );
}
