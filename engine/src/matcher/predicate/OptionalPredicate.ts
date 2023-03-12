import { Predicate } from "./Predicate";

export type OptionalPredicate<T, C> = Predicate<T, C> | undefined;
