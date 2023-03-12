import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchNumericLiteral({
  text = undefined,
  constraints = undefined,
  debugName = "numericLiteral",
}: {
  text?: p.PrimitivePredicateLike<string, Context>;
  constraints?: p.OptionalPredicateArray<ts.NumericLiteral, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isNumericLiteral,
    b.mandatoryPrimitiveProperty("text", text),
    b.constraints(constraints)
  );
}
