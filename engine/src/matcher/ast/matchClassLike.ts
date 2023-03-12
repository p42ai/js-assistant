import ts from "typescript";
import { Context } from "../engine/Context";
import * as p from "../predicate";
import { matchClassDeclaration } from "./matchClassDeclaration.generated";
import { matchClassExpression } from "./matchClassExpression.generated";

export function matchClassLike(
  parameters: {
    modifiers?: p.OptionalPredicate<
      ts.NodeArray<ts.ModifierLike> | undefined,
      Context
    >;
    name?: p.OptionalPredicate<ts.Identifier | undefined, Context>;
    typeParameters?: p.OptionalPredicate<
      ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
      Context
    >;
    heritageClauses?: p.OptionalPredicate<
      ts.NodeArray<ts.HeritageClause> | undefined,
      Context
    >;
    members?: p.OptionalPredicate<ts.NodeArray<ts.ClassElement>, Context>;
    parent?: p.OptionalPredicate<ts.Node, Context>;
    constraints?: p.OptionalPredicateArray<
      ts.ClassExpression | ts.ClassDeclaration,
      Context
    >;
    debugName?: string;
  } = {}
) {
  return p.or(
    matchClassDeclaration(parameters),
    matchClassExpression(parameters)
  );
}
