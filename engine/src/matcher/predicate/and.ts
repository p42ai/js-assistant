import { any } from "./any";
import { Predicate } from "./Predicate";
import { define } from "./predicate-wrapper";

/**
 * Predicate that is true when all it's available matchers are evaluate to true.
 * Matchers that are undefined are ignored.
 */
export function and<T, CONTEXT>(
  ...matchers: (Predicate<T, CONTEXT> | undefined)[]
) {
  const availableMatchers = matchers.filter(
    (matcher) => matcher !== undefined
  ) as Predicate<T, CONTEXT>[];

  if (availableMatchers.length === 0) {
    return any;
  }

  if (availableMatchers.length === 1) {
    return define("and", availableMatchers[0]);
  }

  return define("and", (value: T, context: CONTEXT) => {
    for (const match of availableMatchers) {
      if (!match(value, context)) {
        return false;
      }
    }
    return true;
  });
}
