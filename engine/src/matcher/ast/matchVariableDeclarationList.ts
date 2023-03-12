import ts from "typescript";
import {
  getVariableDeclarationKind,
  VariableDeclarationKind,
} from "../../ast/VariableDeclarationKind";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchVariableDeclarationList({
  debugName = "variableDeclarationList",
  parent = undefined,
  constraints = undefined,
  kind = undefined,
  declarations = undefined,
}: {
  debugName?: string;
  parent?: p.OptionalPredicate<ts.VariableDeclarationList["parent"], Context>;
  constraints?: p.OptionalPredicateArray<ts.VariableDeclarationList, Context>;
  kind?: p.PrimitivePredicateLike<VariableDeclarationKind, Context>;
  declarations?: p.OptionalPredicate<
    ts.NodeArray<ts.VariableDeclaration>,
    Context
  >;
} = {}) {
  return b.object(
    debugName,
    ts.isVariableDeclarationList,
    b.mandatoryProperty("declarations", declarations),
    b.virtualProperty(
      "kind",
      getVariableDeclarationKind,
      p.toPrimitivePredicate(kind)
    ),
    b.parentNode(parent),
    b.constraints(constraints)
  );
}
