import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { getBindings } from "./getBindings";

export const hasNoExternalBindings = (
  node: ts.Node,
  context: Context
): boolean => getBindings(node, context).size === 0;
