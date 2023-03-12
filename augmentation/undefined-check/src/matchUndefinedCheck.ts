import { builders as b, Context, predicates as p } from "@p42/engine";
import ts from "typescript";
import { UndefinedCheckAugmentation } from "./UndefinedCheckAugmentation";
import { UndefinedCheckMatch, UndefinedCheckType } from "./UndefinedCheckMatch";

export function matchUndefinedCheck({
  checkedExpression = undefined,
  isNegated = undefined,
  checkType = undefined,
  node = undefined,
  constraints = undefined,
}: {
  checkedExpression?: p.OptionalPredicate<ts.Expression, Context>;
  isNegated?: p.PrimitivePredicateLike<boolean | undefined, Context>;
  checkType?: p.PrimitivePredicateLike<UndefinedCheckType, Context>;
  node?: p.OptionalPredicate<UndefinedCheckMatch["node"], Context>;
  constraints?: p.OptionalPredicateArray<UndefinedCheckMatch, Context>;
}) {
  return b.matchAugmentationMatcher(
    UndefinedCheckAugmentation,
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
