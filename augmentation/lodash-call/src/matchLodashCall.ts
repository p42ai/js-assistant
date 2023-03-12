import { builders as b, Context, predicates as p } from "@p42/engine";
import ts from "typescript";
import { LodashCallAugmentation } from "./LodashCallAugmentation";
import { LodashCallMatch } from "./LodashCallMatch";

export const matchLodashCall = ({
  name = undefined,
  args = undefined,
  node = undefined,
  constraints = undefined,
}: {
  name?: p.PrimitivePredicateLike<string, Context>;
  args?: p.OptionalPredicate<ts.NodeArray<ts.Expression>, Context>;
  node?: p.OptionalPredicate<LodashCallMatch["node"], Context>;
  constraints?: p.OptionalPredicateArray<LodashCallMatch, Context>;
}) =>
  b.matchAugmentationMatcher(
    LodashCallAugmentation,
    node,
    constraints,
    b.matchAugmentationCaptureMatcher("name", p.toPrimitivePredicate(name)),
    // performance: match details after name check
    b.matchAugmentationNodePropertyMatcher("arguments", args)
  );
