import ts from "typescript";
import * as p from "../predicate";
import * as b from "../builder";
import { isThisExpression } from "../../ast/This";
import { Context } from "../engine/Context";

export function matchThisExpression({
  constraints = undefined,
  debugName = "thisKeyword",
}: {
  constraints?: p.OptionalPredicateArray<ts.ThisExpression, Context>;
  debugName?: string | undefined;
} = {}) {
  return b.object(debugName, isThisExpression, b.constraints(constraints));
}
