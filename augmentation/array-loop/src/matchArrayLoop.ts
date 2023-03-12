import { Binding, builders as b, Context, predicates as p } from "@p42/engine";
import ts from "typescript";
import { ArrayLoopAugmentation } from "./ArrayLoopAugmentation";
import { ArrayLoopMatch, ArrayLoopMatchType } from "./ArrayLoopMatch";

export const matchArrayLoop = ({
  type = undefined,
  elementBinding = undefined,
  indexBinding = undefined,
  body = undefined,
  node = undefined,
  constraints = undefined,
}: {
  type?: p.PrimitivePredicateLike<ArrayLoopMatchType, Context>;
  elementBinding?: p.OptionalPredicate<Binding | undefined, Context>;
  indexBinding?: p.OptionalPredicate<Binding | undefined, Context>;
  body?: p.OptionalPredicate<ts.Statement, Context>;
  node?: p.OptionalPredicate<ArrayLoopMatch["node"], Context>;
  constraints?: p.OptionalPredicateArray<ArrayLoopMatch, Context>;
}) =>
  b.matchAugmentationMatcher(
    ArrayLoopAugmentation,
    node,
    constraints,
    b.matchAugmentationDataMatcher("type", p.toPrimitivePredicate(type)),
    b.matchAugmentationCaptureMatcher("elementBinding", elementBinding),
    b.matchAugmentationCaptureMatcher("indexBinding", indexBinding),
    b.matchAugmentationCaptureMatcher("body", body)
  );
