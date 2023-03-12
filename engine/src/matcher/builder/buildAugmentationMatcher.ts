import ts from "typescript";
import { Augmentation } from "../../augmentation/Augmentation";
import { Context } from "../engine/Context";
import * as p from "../predicate";

const augmentationChecked = <VALUE, AUGMENTATION extends Augmentation<VALUE>>(
  augmentation: AUGMENTATION,
  ...matchers: Array<p.Predicate<VALUE, Context> | undefined>
) => {
  const additionalChecks = p.and<VALUE, Context>(...matchers);
  return (node: ts.Node, context: Context) => {
    const augmentedValue = augmentation.getValue(node, context);
    return augmentedValue != null && additionalChecks(augmentedValue, context);
  };
};

export const buildAugmentationMatcher = <
  VALUE,
  AUGMENTATION extends Augmentation<VALUE>
>(
  augmentation: AUGMENTATION,
  constraints: p.OptionalPredicateArray<VALUE, Context>,
  ...matchers: Array<p.Predicate<VALUE, Context> | undefined>
) =>
  p.define<ts.Node, Context>(
    augmentation.id,
    augmentationChecked(
      augmentation,
      ...matchers,
      p.toConstraintsMatcher(constraints)
    )
  );
