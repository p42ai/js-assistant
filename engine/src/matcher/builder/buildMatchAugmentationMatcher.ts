import { MatchAugmentation } from "../../augmentation/MatchAugmentation";
import { Context } from "../engine/Context";
import { AnyMatch } from "../engine/Match";
import * as p from "../predicate";
import { buildAugmentationMatcher } from "./buildAugmentationMatcher";
import { buildVirtualProperty } from "./buildVirtualProperty";

export const buildMatchAugmentationMatcher = <
  PATTERN extends AnyMatch,
  AUGMENTATION extends MatchAugmentation<PATTERN>
>(
  augmentation: AUGMENTATION,
  node: p.OptionalPredicate<PATTERN["node"], Context>,
  constraints: p.OptionalPredicateArray<PATTERN, Context>,
  ...matchers: Array<p.Predicate<PATTERN, Context> | undefined>
) =>
  buildAugmentationMatcher(
    augmentation,
    constraints,
    ...matchers,
    buildVirtualProperty("node", (match: PATTERN) => match.node, node)
  );
