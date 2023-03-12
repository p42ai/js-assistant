import { Context } from "../engine/Context";
import { OptionalPredicate } from "../predicate/OptionalPredicate";
import { Predicate } from "../predicate/Predicate";
import { resolve } from "../resolve";

export const buildVirtualProperty = <INPUT_TYPE, RESOLVED_TYPE>(
  name: string,
  resolver: (node: INPUT_TYPE, context: Context) => RESOLVED_TYPE,
  match: OptionalPredicate<RESOLVED_TYPE, Context>
): Predicate<INPUT_TYPE, Context> | undefined =>
  match != null
    ? resolve({
        debugName: name,
        resolver,
        match,
      })
    : undefined;
