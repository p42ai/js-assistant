import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { Predicate } from "../matcher/predicate/Predicate";

export function hasDescendant(
  node: ts.Node,
  predicate: Predicate<ts.Node, Context>,
  context: Context
): boolean {
  let foundMatch = false;

  const wrappingVisitor = (node: ts.Node): void => {
    if (foundMatch) {
      return;
    }

    if (predicate(node, context)) {
      foundMatch = true;
      return;
    }

    ts.forEachChild(node, wrappingVisitor);
  };
  wrappingVisitor(node);

  return foundMatch;
}
