import ts from "typescript";
import { PartialRecord } from "../../util/PartialRecord";
import { Context } from "../engine/Context";
import { Predicate } from "../predicate/Predicate";
import { define } from "../predicate/predicate-wrapper";

export const buildOptionalProperty = <PROPERTY extends string, T>(
  name: PROPERTY,
  matcher: Predicate<T | undefined, Context> | undefined
): Predicate<ts.Node & PartialRecord<PROPERTY, T>, Context> | undefined =>
  matcher != null
    ? define(name, (value: PartialRecord<PROPERTY, T>, context) =>
        matcher(value[name], context)
      )
    : undefined;
