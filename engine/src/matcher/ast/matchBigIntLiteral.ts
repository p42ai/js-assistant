import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchBigIntLiteral({
  text = undefined,
  constraints = undefined,
  debugName = "BigIntLiteral",
}: {
  text?: p.PrimitivePredicateLike<string, Context>;
  constraints?: p.OptionalPredicateArray<ts.BigIntLiteral, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isBigIntLiteral,
    b.mandatoryPrimitiveProperty("text", text),
    b.constraints(constraints)
  );
}
