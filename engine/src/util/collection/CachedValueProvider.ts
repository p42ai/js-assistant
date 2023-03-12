import { ValueProvider } from "./ValueProvider";

export function cachedValueProvider<T, C>(
  source: ValueProvider<T, C>
): ValueProvider<T, C> {
  let cachedValues: T[] | undefined;

  return (context) => {
    if (cachedValues == null) {
      cachedValues = source(context);
    }

    return cachedValues!;
  };
}
