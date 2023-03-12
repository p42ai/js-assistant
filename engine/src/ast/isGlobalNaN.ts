import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { GlobalProperty } from "./GlobalProperty";
import { isGlobalIdentifier } from "./isGlobalIdentifier";

export const isGlobalNaN = (
  node: ts.Node,
  context: Context
): node is ts.Identifier =>
  isGlobalIdentifier(node, context, GlobalProperty.NaN);
