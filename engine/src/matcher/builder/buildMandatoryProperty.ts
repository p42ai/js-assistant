import { Context } from "../engine/Context";
import { OptionalPredicate } from "../predicate/OptionalPredicate";
import { Predicate } from "../predicate/Predicate";
import { define } from "../predicate/predicate-wrapper";

export const buildMandatoryProperty = <PROPERTY extends string, T>(
  name: PROPERTY,
  matcher: OptionalPredicate<T, Context>
): Predicate<Record<PROPERTY, T>, Context> | undefined =>
  matcher != null
    ? define(name, (value: Record<PROPERTY, T>, context: Context) =>
        matcher(value[name], context)
      )
    : undefined;
