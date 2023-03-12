export type Comparator<T> = (a: T, b: T) => boolean;

export function sameComparator<T>(a: T, b: T) {
  return a === b;
}
