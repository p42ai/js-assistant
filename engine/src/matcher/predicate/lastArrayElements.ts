import * as _ from "lodash";
import { Predicate } from "./Predicate";
import { define } from "./predicate-wrapper";
import { typeCheck } from "./typeCheck";

export function lastArrayElements<T, C>(...predicates: Predicate<T, C>[]) {
  return define(
    "lastArrayElements",
    typeCheck(_.isArray, (value, context: C) => {
      if (value.length < predicates.length) {
        return false;
      }

      const startFromEnd = value.length - predicates.length;

      for (let i = 0; i < predicates.length; i++) {
        if (!predicates[i](value[startFromEnd + i], context)) {
          return false;
        }
      }
      return true;
    })
  );
}
