import { ValueProvider } from "./ValueProvider";

export function arrayValueProvider<T, C>(
  values: Array<T>
): ValueProvider<T, C> {
  return () => values;
}
