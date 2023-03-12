import ts from "typescript";
import { Context } from "./engine/Context";
import { Predicate } from "./predicate";
import { define } from "./predicate/predicate-wrapper";

export function hasAncestor(predicate: Predicate<ts.Node, Context>) {
  return define<ts.Node, Context>("hasAncestor", (node, context) =>
    context.getAncestors(node).contains(predicate, context)
  );
}
