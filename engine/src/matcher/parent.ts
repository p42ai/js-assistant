import ts from "typescript";
import { Context } from "./engine/Context";
import { Predicate } from "./predicate";
import { define } from "./predicate/predicate-wrapper";

export function parent(matcher: Predicate<ts.Node, Context>) {
  return define("parent", (node: ts.Node, context: Context) =>
    matcher(node.parent, context)
  );
}
