import { Predicate } from "../../matcher/predicate/Predicate";
import { ValueProvider } from "./ValueProvider";

export function untilValueProvider<T, C>(
  source: ValueProvider<T, C>,
  stopPredicate: Predicate<T, C>
): ValueProvider<T, C> {
  return (context: C) => {
    const result: T[] = [];
    for (const value of source(context)) {
      if (stopPredicate(value, context)) {
        break;
      }
      result.push(value);
    }
    return result;
  };
}
