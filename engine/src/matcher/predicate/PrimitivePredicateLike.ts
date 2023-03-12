import { Predicate } from "./Predicate";

// Intentionally not restricted to string | boolean | number to allow for enum values
export type PrimitivePredicateLike<T, C> =
  | Predicate<T, C>
  | Array<T>
  | T
  | undefined;
