import { HardPartialRecord } from "../../util/PartialRecord";
import { Context } from "../engine/Context";
import { Match } from "../engine/Match";
import * as p from "../predicate";
import { Predicate } from "../predicate/Predicate";

export const buildMatchAugmentationCaptureMatcher = <
  PROPERTY extends string,
  VALUE,
  PATTERN extends Match<any, HardPartialRecord<PROPERTY, VALUE>, any>
>(
  propertyName: PROPERTY,
  matcher: Predicate<VALUE, Context> | undefined
) =>
  matcher != null
    ? p.define(`captures.${propertyName}`, (value: PATTERN, context: Context) =>
        matcher(value.captures[propertyName], context)
      )
    : undefined;
