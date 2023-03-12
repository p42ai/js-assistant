import { Context } from "../engine/Context";
import * as p from "../predicate";
import { buildMandatoryProperty } from "./buildMandatoryProperty";

export const buildMandatoryPrimitiveProperty = <PROPERTY extends string, T>(
  name: PROPERTY,
  matcher: p.PrimitivePredicateLike<T, Context>
): p.Predicate<Record<PROPERTY, T>, Context> | undefined =>
  buildMandatoryProperty(name, p.toPrimitivePredicate(matcher));
