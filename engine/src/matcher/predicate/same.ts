import { Predicate } from "./Predicate";
import { define } from "./predicate-wrapper";

export function same<T, C>(expectedValue: T): Predicate<T, C> {
  return define(
    `same "${expectedValue}"`,
    (value: T) => expectedValue === value
  );
}
