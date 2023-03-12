import { ValueProvider } from "./ValueProvider";
import { Mapping, normalize } from "./Mapping";

export function mappingValueProvider<S, T, C>(
  source: ValueProvider<S, C>,
  navigate: Mapping<S, T, C>
): ValueProvider<T, C> {
  return (context: C) => {
    const result: T[] = [];
    for (const value of source(context)) {
      // note: use an explicit loop instead of spread operator
      // to prevent "Maximum call stack size exceeded" error
      const values = normalize(navigate)(value, context);
      for (const singleValue of values) {
        result.push(singleValue);
      }
    }
    return result;
  };
}
