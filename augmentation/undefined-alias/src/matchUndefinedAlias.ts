import { builders as b, Context, predicates as p } from "@p42/engine";
import { UndefinedAliasAugmentation } from "./UndefinedAliasAugmentation";
import { UndefinedAliasMatch, UndefinedAliasType } from "./UndefinedAliasMatch";

export function matchUndefinedAlias({
  type = undefined,
  node = undefined,
  constraints = undefined,
}: {
  type?: p.PrimitivePredicateLike<UndefinedAliasType, Context>;
  node?: p.OptionalPredicate<UndefinedAliasMatch["node"], Context>;
  constraints?: p.Predicate<UndefinedAliasMatch, Context>[] | undefined;
} = {}) {
  return b.matchAugmentationMatcher(
    UndefinedAliasAugmentation,
    node,
    constraints,
    b.matchAugmentationCaptureMatcher("type", p.toPrimitivePredicate(type))
  );
}
