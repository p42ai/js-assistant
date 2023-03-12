import { builders as b, Context, predicates as p } from "@p42/engine";
import ts from "typescript";
import { ConditionalAssignmentAugmentation } from "./ConditionalAssignmentAugmentation";
import {
  ConditionalAssignmentMatch,
  ConditionalAssignmentType,
} from "./ConditionalAssignmentMatch";

export function matchConditionalAssignment({
  variableName = undefined,
  condition = undefined,
  whenTrue = undefined,
  whenFalse = undefined,
  type = undefined,
  node = undefined,
  constraints = undefined,
}: {
  variableName?: p.PrimitivePredicateLike<string, Context>;
  condition?: p.OptionalPredicate<ts.Expression, Context>;
  whenTrue?: p.OptionalPredicate<ts.Expression, Context>;
  whenFalse?: p.OptionalPredicate<ts.Expression, Context>;
  type?: p.PrimitivePredicateLike<ConditionalAssignmentType, Context>;
  node?: p.OptionalPredicate<ConditionalAssignmentMatch["node"], Context>;
  constraints?: p.OptionalPredicateArray<ConditionalAssignmentMatch, Context>;
}) {
  return b.matchAugmentationMatcher(
    ConditionalAssignmentAugmentation,
    node,
    constraints,
    b.matchAugmentationCaptureMatcher(
      "variableName",
      p.toPrimitivePredicate(variableName)
    ),
    b.matchAugmentationCaptureMatcher("condition", condition),
    b.matchAugmentationCaptureMatcher("whenTrue", whenTrue),
    b.matchAugmentationCaptureMatcher("whenFalse", whenFalse),
    b.matchAugmentationCaptureMatcher("type", p.toPrimitivePredicate(type))
  );
}
