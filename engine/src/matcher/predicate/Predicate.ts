/**
 * Matches a value with potential captures.
 *
 * @param value value that should be matched
 * @param context unmodifiable context that provides additional information
 *
 * @returns true if the value could be matched
 */
export type Predicate<T, C> = (value: T, context: C) => boolean;
