import { ValueProvider } from "./ValueProvider";
import { cachedValueProvider } from "./CachedValueProvider";
import { mappingValueProvider } from "./MappingValueProvider";
import { singleValueProvider } from "./SingleValueProvider";

export function referenceValueProvider<S, T, C>(
  reference: S,
  navigate: (value: S, context: C) => T[]
): ValueProvider<T, C> {
  return cachedValueProvider(
    mappingValueProvider(singleValueProvider(reference), navigate)
  );
}
