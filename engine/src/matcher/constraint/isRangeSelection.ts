import ts from "typescript";
import { Context } from "../engine/Context";

export function isRangeSelection(node: ts.Node, context: Context): boolean {
  const range = context?.selectedRange;
  return range != null && range.start !== range.end;
}
