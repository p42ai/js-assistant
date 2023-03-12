import ts from "typescript";
import { PartialRecord } from "../../util/PartialRecord";
import { Context } from "../engine/Context";
import * as p from "../predicate";
import { Predicate } from "../predicate/Predicate";
import { define } from "../predicate/predicate-wrapper";

export const buildVirtualNotNullProperty = <PROPERTY extends string, T>(
  matcherName: string,
  propertyName: PROPERTY,
  predicate: p.PrimitivePredicateLike<boolean, Context>
): Predicate<ts.Node & PartialRecord<PROPERTY, T>, Context> | undefined => {
  const matcher = p.toPrimitivePredicate(predicate);
  return matcher != null
    ? define(
        matcherName,
        (value: PartialRecord<PROPERTY, T>, context: Context) =>
          matcher(value[propertyName] != null, context)
      )
    : undefined;
};
