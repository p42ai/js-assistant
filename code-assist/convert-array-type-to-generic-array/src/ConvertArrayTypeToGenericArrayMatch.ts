
import { Context, Match } from "@p42/engine";
import ts from "typescript";

type ConvertArrayTypeToGenericArrayNode = ts.ArrayTypeNode;
type ConvertArrayTypeToGenericArrayCaptures = Record<string, never>;
type ConvertArrayTypeToGenericArrayData = undefined;

export class ConvertArrayTypeToGenericArrayMatch
  implements
    Match<
      ConvertArrayTypeToGenericArrayNode,
      ConvertArrayTypeToGenericArrayCaptures,
      ConvertArrayTypeToGenericArrayData
    >
{
  constructor(
    readonly node: ConvertArrayTypeToGenericArrayNode,
    readonly captures: ConvertArrayTypeToGenericArrayCaptures,
    readonly data: ConvertArrayTypeToGenericArrayData,
    readonly context: Context
  ) {}
}
