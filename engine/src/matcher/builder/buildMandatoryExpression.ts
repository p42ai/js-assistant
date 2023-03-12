import ts from "typescript";
import { Context } from "../engine/Context";
import { matchMaybeParenthesized } from "../matchMaybeParenthesized";
import { OptionalPredicate } from "../predicate/OptionalPredicate";
import { Predicate } from "../predicate/Predicate";
import { buildMandatoryProperty } from "./buildMandatoryProperty";

export const buildMandatoryExpression = <
  PROPERTY extends string,
  T extends ts.Expression
>(
  name: PROPERTY,
  matcher: OptionalPredicate<T, Context>
): Predicate<T & Record<PROPERTY, T>, Context> | undefined =>
  buildMandatoryProperty(
    name,
    matcher != null
      ? matchMaybeParenthesized(matcher as Predicate<ts.Expression, Context>)
      : undefined
  );
