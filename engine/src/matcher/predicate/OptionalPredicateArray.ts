import { Predicate } from "./Predicate";

export type OptionalPredicateArray<T, C> = Array<Predicate<T, C>> | undefined;
