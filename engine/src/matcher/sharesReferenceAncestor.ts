import _ from "lodash";
import ts from "typescript";
import { Context } from "./engine/Context";
import { Predicate } from "./predicate/Predicate";

export function sharesReferenceAncestor(
  node: ts.Node,
  ancestorPredicate: Predicate<ts.Node, Context>,
  context: Context
): Predicate<ts.Node, Context> {
  const ancestors = context.getAncestors(node);
  const referenceAncestor = ancestors.find(ancestorPredicate, context);

  return referenceAncestor == null
    ? _.constant(true)
    : (node) =>
        context.getAncestors(node).containsValue(referenceAncestor, context);
}
