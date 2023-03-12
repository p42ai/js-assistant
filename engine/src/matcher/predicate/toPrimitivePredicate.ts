import * as _ from "lodash";
import { isIncludedIn } from "./isIncludedIn";
import { Predicate } from "./Predicate";
import { PrimitivePredicateLike } from "./PrimitivePredicateLike";
import { same } from "./same";

export function toPrimitivePredicate<T, C>(
  value: PrimitivePredicateLike<T, C>
): Predicate<T, C> | undefined {
  if (value == null) {
    return undefined;
  }

  // value instanceof Predicate<T>
  if (_.isFunction(value)) {
    return value;
  }

  // value instanceof T[]
  if (_.isArray(value)) {
    return isIncludedIn(...value);
  }

  // value instanceof T
  return same(value) as Predicate<T, C>; // TODO understand / fix NonNullable
}
