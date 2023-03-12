import ts from "typescript";
import * as p from "../predicate";
import * as b from "../builder";
import { Context } from "../engine/Context";

export function matchObjectBindingPattern({
  elements = undefined,
  parent = undefined,
  constraints = undefined,
  debugName = "objectBindingPattern",
}: {
  elements?: p.OptionalPredicate<ts.NodeArray<ts.ArrayBindingElement>, Context>;
  parent?: p.OptionalPredicate<
    ts.VariableDeclaration | ts.ParameterDeclaration | ts.BindingElement,
    Context
  >;
  constraints?: p.OptionalPredicateArray<ts.ObjectBindingPattern, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isObjectBindingPattern,
    b.mandatoryProperty("elements", elements),
    b.mandatoryProperty("parent", parent),
    b.constraints(constraints)
  );
}
