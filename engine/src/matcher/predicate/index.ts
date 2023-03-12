import * as _ from "lodash";
import { and } from "./and";
import { isIncludedIn } from "./isIncludedIn";
import { Predicate } from "./Predicate";
import { define } from "./predicate-wrapper";
import { same } from "./same";
import { typeCheck } from "./typeCheck";

export const empty = define("empty", (value: any) => value == null);

export const notEmpty = define("notEmpty", (value: any) => value != null);

export const isUndefined = same(undefined) as Predicate<any, any>;

export const nothing = same(null) as Predicate<any, any>;

export const { isString } = _;

export function not<T, C>(match: Predicate<T, C>): Predicate<T, C> {
  const not = (value: T, context: C) => !match(value, context);
  return define(`not`, not);
}

export function or<T, C>(...matchers: Predicate<T, C>[]) {
  const or = (value: T, context: C) => {
    for (const match of matchers) {
      if (match(value, context)) {
        return true;
      }
    }
    return false;
  };

  return define("or", or);
}

export const includedIn = isIncludedIn;

export function string(...expectedValues: string[]) {
  return typeCheck(_.isString, isIncludedIn(...expectedValues));
}

export function number(expectedValue: number) {
  return typeCheck(_.isNumber, same(expectedValue));
}

export function boolean(expectedValue: boolean) {
  return typeCheck(_.isBoolean, same(expectedValue));
}

export function recursive<T, C>(
  f: (recursion: Predicate<T, C>) => Predicate<T, C>
): Predicate<T, C> {
  let recursiveMatcher: Predicate<T, C> | undefined = undefined;
  const recursion = (value: T, context: C) => recursiveMatcher!(value, context);
  recursiveMatcher = f(recursion);
  return define("recursion", recursion);
}

export function every<T, C>(predicate: Predicate<T, C>) {
  return typeCheck(_.isArray, (value: Array<T>, context: C) =>
    value.every((value: T) => predicate(value, context))
  );
}

// additional function to make emptiness explicit
export function emptyArray() {
  return array();
}

export function array<T, C>(...predicates: Predicate<T, C>[]) {
  return define(
    "array",
    typeCheck(_.isArray, (value, context: C) => {
      if (value.length !== predicates.length) {
        return false;
      }

      for (let i = 0; i < predicates.length; i++) {
        if (!predicates[i](value[i], context)) {
          return false;
        }
      }
      return true;
    })
  );
}

export function toConstraintsMatcher<T, C>(
  constraints: Predicate<T, C>[] | undefined
) {
  return constraints != null && constraints.length > 0
    ? define("constraints", and(...constraints))
    : undefined;
}

export function some<T, C>(match: Predicate<T, C>) {
  return typeCheck(_.isArray, (value, context: C) =>
    _.some(value, (value) => match(value, context))
  );
}

/**
 * Use this when full sets need to be captured.
 */
export function someEvaluateAll<T, C>(match: Predicate<T, C>) {
  return typeCheck(_.isArray, (value, context: C) => {
    let foundMatch = false;
    value.forEach((value) => {
      foundMatch = match(value, context) || foundMatch;
    });
    return foundMatch;
  });
}

export { and } from "./and";
export { any } from "./any";
export { firstArrayElements } from "./firstArrayElements";
export { isDefined } from "./isDefined";
export { lastArrayElements } from "./lastArrayElements";
export { OptionalPredicate } from "./OptionalPredicate";
export { OptionalPredicateArray } from "./OptionalPredicateArray";
export { Predicate } from "./Predicate";
export { define } from "./predicate-wrapper";
export { PrimitivePredicateLike } from "./PrimitivePredicateLike";
export { same } from "./same";
export { toPrimitivePredicate } from "./toPrimitivePredicate";
export { typeCheck } from "./typeCheck";
