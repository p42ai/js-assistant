import ts from "typescript";
import { PartialRecord } from "../../util/PartialRecord";
import { Context } from "../engine/Context";
import { Predicate } from "../predicate/Predicate";

export const optionalProperty =
  <PROPERTY extends string, VALUE>(
    propertyName: PROPERTY,
    matcher: Predicate<VALUE | undefined, Context>
  ) =>
  (node: ts.Node & PartialRecord<PROPERTY, VALUE>, context: Context) =>
    matcher(node[propertyName], context);
