import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchNewExpression({
  expression = undefined,
  typeArguments = undefined,
  argumentsArray = undefined,
  parent = undefined,
  constraints = undefined,
  debugName = "newExpression",
}: {
  expression?: p.OptionalPredicate<ts.LeftHandSideExpression, Context>;
  typeArguments?: p.OptionalPredicate<
    ts.NodeArray<ts.TypeNode> | undefined,
    Context
  >;
  argumentsArray?: p.OptionalPredicate<
    ts.NodeArray<ts.Expression> | undefined,
    Context
  >;
  parent?: p.OptionalPredicate<ts.Node, Context>;
  constraints?: p.OptionalPredicateArray<ts.NewExpression, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isNewExpression,
    b.mandatoryExpression("expression", expression),
    b.optionalProperty("typeArguments", typeArguments),
    b.optionalProperty("arguments", argumentsArray),
    b.mandatoryProperty("parent", parent),
    b.constraints(constraints)
  );
}
