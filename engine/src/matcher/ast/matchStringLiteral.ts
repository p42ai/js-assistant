import ts from "typescript";
import * as p from "../predicate";
import * as b from "../builder";
import { Context } from "../engine/Context";

export function matchStringLiteral({
  text = undefined,
  constraints = undefined,
  debugName = "stringLiteral",
}: {
  text?: p.PrimitivePredicateLike<string, Context>;
  constraints?: p.OptionalPredicateArray<ts.StringLiteral, Context>;
  debugName?: string | undefined;
} = {}) {
  return b.object(
    debugName,
    ts.isStringLiteral,
    b.mandatoryPrimitiveProperty("text", text),
    b.constraints(constraints)
  );
}

export const matchUndefinedStringLiteral = matchStringLiteral({
  debugName: "undefinedStringLiteral",
  text: "undefined",
});
