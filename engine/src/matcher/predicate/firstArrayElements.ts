import * as _ from "lodash";
import { Predicate } from "./Predicate";
import { define } from "./predicate-wrapper";
import { typeCheck } from "./typeCheck";

export function firstArrayElements<T, C>(...predicates: Predicate<T, C>[]) {
  return define(
    "firstArrayElements",
    typeCheck(_.isArray, (value, context: C) => {
      if (value.length < predicates.length) {
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
