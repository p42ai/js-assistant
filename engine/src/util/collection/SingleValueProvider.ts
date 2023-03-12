import { ValueProvider } from "./ValueProvider";

export function singleValueProvider<T, C>(value: T): ValueProvider<T, C> {
  return () => [value];
}
