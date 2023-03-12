import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchNoSubstitutionTemplateLiteral({
  text = undefined,
  constraints = undefined,
  debugName = "NoSubstitutionTemplateLiteral",
}: {
  text?: p.PrimitivePredicateLike<string, Context>;
  constraints?: p.OptionalPredicateArray<
    ts.NoSubstitutionTemplateLiteral,
    Context
  >;
  debugName?: string | undefined;
} = {}) {
  return b.object(
    debugName,
    ts.isNoSubstitutionTemplateLiteral,
    b.mandatoryPrimitiveProperty("text", text),
    b.constraints(constraints)
  );
}
