import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchVariableDeclaration({
  debugName = "variableDeclaration",
  parent = undefined,
  constraints = undefined,
  name = undefined,
  initializer = undefined,
  type = undefined,
}: {
  debugName?: string;
  parent?: p.OptionalPredicate<ts.VariableDeclaration["parent"], Context>;
  constraints?: p.OptionalPredicateArray<ts.VariableDeclaration, Context>;
  name?: p.OptionalPredicate<ts.BindingName, Context>;
  initializer?: p.OptionalPredicate<ts.Expression | undefined, Context>;
  type?: p.OptionalPredicate<ts.TypeNode | undefined, Context>;
} = {}) {
  return b.object(
    debugName,
    ts.isVariableDeclaration,
    b.mandatoryProperty("name", name),
    b.optionalProperty("initializer", initializer),
    b.optionalProperty("type", type),
    b.parentNode(parent),
    b.constraints(constraints)
  );
}
