import ts from "typescript";
import { PartialRecord } from "../../util/PartialRecord";
import { Context } from "../engine/Context";
import * as p from "../predicate";
import { Predicate } from "../predicate/Predicate";
import { buildOptionalProperty } from "./buildOptionalProperty";

export const buildOptionalPrimitiveProperty = <PROPERTY extends string, T>(
  name: PROPERTY,
  matcher: p.PrimitivePredicateLike<T | undefined, Context>
): Predicate<ts.Node & PartialRecord<PROPERTY, T>, Context> | undefined =>
  buildOptionalProperty(name, p.toPrimitivePredicate(matcher));
