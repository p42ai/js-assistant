import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { isNodeStructureEqual } from "./isNodeStructureEqual.generated";

export const findClones = <T extends ts.Node>(
  node: T,
  container: ts.Node,
  context: Context
): Array<T> => {
  const occurrences: Array<T> = [];
  container.forEachChild(function duplicatedOccurrenceVisitor(child: ts.Node) {
    if (isNodeStructureEqual(child, node, context)) {
      occurrences.push(child as T);
      return;
    }
    child.forEachChild(duplicatedOccurrenceVisitor);
  });
  return occurrences;
};
