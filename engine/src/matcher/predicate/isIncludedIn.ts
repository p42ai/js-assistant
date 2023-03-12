import { define } from "./predicate-wrapper";

// TODO rename includedIn to oneOf
export function isIncludedIn<T>(...expectedValues: T[]) {
  const matcher =
    expectedValues.length > 1
      ? (value: T) => expectedValues.includes(value)
      : (value: T) => expectedValues[0] === value;

  return define(`isIncludedIn "${expectedValues}"`, matcher);
}
