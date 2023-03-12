import { HardPartialRecord } from "../../util/PartialRecord";
import { Context } from "../engine/Context";
import { Match } from "../engine/Match";
import * as p from "../predicate";
import { Predicate } from "../predicate/Predicate";

export const buildMatchAugmentationDataMatcher = <
  PROPERTY extends string,
  VALUE,
  PATTERN extends Match<any, any, HardPartialRecord<PROPERTY, VALUE>>
>(
  propertyName: PROPERTY,
  matcher: Predicate<VALUE, Context> | undefined
) =>
  matcher != null
    ? p.define(`data.${propertyName}`, (value: PATTERN, context: Context) =>
        matcher(value.data[propertyName], context)
      )
    : undefined;
