import ts from "typescript";
import { HardPartialRecord } from "../../util/PartialRecord";
import { Context } from "../engine/Context";
import { Match } from "../engine/Match";
import * as p from "../predicate";
import { Predicate } from "../predicate/Predicate";

export const buildMatchAugmentationNodePropertyMatcher = <
  PROPERTY extends string,
  VALUE,
  PATTERN extends Match<ts.Node & HardPartialRecord<PROPERTY, VALUE>, any, any>
>(
  propertyName: PROPERTY,
  matcher: Predicate<VALUE, Context> | undefined
) =>
  matcher != null
    ? p.define(`node.${propertyName}`, (value: PATTERN, context: Context) =>
        matcher(value.node[propertyName], context)
      )
    : undefined;
