import { ValueProvider } from "./ValueProvider";

export function filteringValueProvider<T, C>(
  source: ValueProvider<T, C>,
  simplePredicate: (value: T) => boolean
): ValueProvider<T, C> {
  return (context) => source(context).filter(simplePredicate);
}
