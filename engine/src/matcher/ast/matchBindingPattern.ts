import ts from "typescript";
import * as p from "../predicate";
import * as b from "../builder";
import { Context } from "../engine/Context";

export function matchBindingPattern({
  elements = undefined,
  parent = undefined,
  constraints = undefined,
}: {
  elements?: p.OptionalPredicate<ts.NodeArray<ts.ArrayBindingElement>, Context>;
  parent?: p.OptionalPredicate<
    ts.VariableDeclaration | ts.ParameterDeclaration | ts.BindingElement,
    Context
  >;
  constraints?: p.OptionalPredicateArray<ts.BindingPattern, Context>;
} = {}) {
  return b.object(
    "bindingPattern",
    (value: ts.Node): value is ts.BindingPattern =>
      ts.isObjectBindingPattern(value) || ts.isArrayBindingPattern(value),
    b.mandatoryProperty("elements", elements),
    b.mandatoryProperty("parent", parent),
    b.constraints(constraints)
  );
}
