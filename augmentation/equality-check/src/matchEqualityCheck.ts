import ts from "typescript";
import { builders as b, Context, predicates as p } from "@p42/engine";
import { EqualityCheckAugmentation } from "./EqualityCheckAugmentation";
import { EqualityCheckMatch } from "./EqualityCheckMatch";

export function matchEqualityCheck({
  part1 = undefined,
  part2 = undefined,
  isStrict = undefined,
  isNegated = undefined,
  node = undefined,
  constraints = undefined,
}: {
  part1?: p.OptionalPredicate<ts.Expression, Context>;
  part2?: p.OptionalPredicate<ts.Expression, Context>;
  isStrict?: p.PrimitivePredicateLike<boolean, Context>;
  isNegated?: p.PrimitivePredicateLike<boolean, Context>;
  node?: p.OptionalPredicate<EqualityCheckMatch["node"], Context>;
  constraints?: p.OptionalPredicateArray<EqualityCheckMatch, Context>;
}) {
  // order for parts does not matter
  let partsMatcher: p.OptionalPredicate<EqualityCheckMatch, Context>;
  if (part1 != null && part2 != null) {
    partsMatcher = p.or(
      (value, context) =>
        part1(value.captures.part1, context) &&
        part2(value.captures.part2, context),
      (value, context) =>
        part1(value.captures.part2, context) &&
        part2(value.captures.part1, context)
    );
  } else if (part1 == null && part2 != null) {
    partsMatcher = p.or(
      (value, context) => part2(value.captures.part1, context),
      (value, context) => part2(value.captures.part2, context)
    );
  } else if (part1 != null && part2 == null) {
    partsMatcher = p.or(
      (value, context) => part1(value.captures.part1, context),
      (value, context) => part1(value.captures.part2, context)
    );
  } else {
    partsMatcher = undefined;
  }

  return b.matchAugmentationMatcher(
    EqualityCheckAugmentation,
    node,
    constraints,
    partsMatcher,
    b.matchAugmentationCaptureMatcher(
      "isNegated",
      p.toPrimitivePredicate(isNegated)
    ),
    b.matchAugmentationCaptureMatcher(
      "isStrict",
      p.toPrimitivePredicate(isStrict)
    )
  );
}
