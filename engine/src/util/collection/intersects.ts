export function intersects<T>(values1: Array<T>, values2: Array<T>): boolean {
  return values1.some((value) => values2.includes(value));
}
