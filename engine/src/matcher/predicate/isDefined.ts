import { and } from "./and";
import { Predicate } from "./Predicate";
import { define } from "./predicate-wrapper";

export function isDefined<T, C>(
  ...matchers: Predicate<T, C>[]
): Predicate<T | undefined, C> {
  const additionalChecks = and<T, C>(...matchers);
  return define(
    "isDefined",
    (value: T | undefined, context: C) =>
      value !== undefined && additionalChecks(value, context)
  );
}
