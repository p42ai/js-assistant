import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchFunctionDeclaration({
  name = undefined,
  modifiers = undefined,
  typeParameters = undefined,
  parameters = undefined,
  type = undefined,
  body = undefined,
  parent = undefined,
  constraints = undefined,
  debugName = "functionDeclaration",
}: {
  name?: p.OptionalPredicate<ts.Identifier | undefined, Context>;
  modifiers?: p.OptionalPredicate<
    ts.NodeArray<ts.Modifier> | undefined,
    Context
  >;
  typeParameters?: p.OptionalPredicate<
    ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
    Context
  >;
  parameters?: p.OptionalPredicate<
    ts.NodeArray<ts.ParameterDeclaration>,
    Context
  >;
  type?: p.OptionalPredicate<ts.TypeNode | undefined, Context>;
  body?: p.OptionalPredicate<ts.Block | undefined, Context>;
  parent?: p.OptionalPredicate<ts.Node, Context>;
  constraints?: p.OptionalPredicateArray<ts.FunctionDeclaration, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isFunctionDeclaration,
    b.optionalProperty("name", name),
    b.optionalProperty("modifiers", modifiers),
    b.optionalProperty("typeParameters", typeParameters),
    b.mandatoryProperty("parameters", parameters),
    b.optionalProperty("type", type),
    b.optionalProperty("body", body),
    b.mandatoryProperty("parent", parent),
    b.constraints(constraints)
  );
}
