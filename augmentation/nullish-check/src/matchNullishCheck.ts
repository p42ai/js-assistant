import { builders as b, Context, predicates as p } from "@p42/engine";
import ts from "typescript";
import { NullishCheckAugmentation } from "./NullishCheckAugmentation";
import { NullishCheckMatch, NullishCheckType } from "./NullishCheckMatch";

export function matchNullishCheck({
  checkedExpression = undefined,
  isNegated = undefined,
  checkType = undefined,
  node = undefined,
  constraints = undefined,
}: {
  checkedExpression?: p.OptionalPredicate<ts.Expression, Context>;
  isNegated?: p.PrimitivePredicateLike<boolean, Context>;
  checkType?: p.PrimitivePredicateLike<NullishCheckType, Context>;
  node?: p.OptionalPredicate<NullishCheckMatch["node"], Context>;
  constraints?: p.Predicate<NullishCheckMatch, Context>[] | undefined;
}) {
  return b.matchAugmentationMatcher(
    NullishCheckAugmentation,
    node,
    constraints,
    b.matchAugmentationCaptureMatcher("checkedExpression", checkedExpression),
    b.matchAugmentationCaptureMatcher(
      "isNegated",
      p.toPrimitivePredicate(isNegated)
    ),
    b.matchAugmentationCaptureMatcher(
      "checkType",
      p.toPrimitivePredicate(checkType)
    )
  );
}
