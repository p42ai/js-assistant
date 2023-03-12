import _ from "lodash";
import ts from "typescript";
import { Binding } from "../augmentation/scope/Binding";
import { BindingReferenceAugmentation } from "../augmentation/scope/reference/BindingReferenceAugmentation";
import { Context } from "../matcher/engine/Context";
import { visitSelfAndEachDescendant } from "./visitSelfAndEachDescendant";

/**
 * Returns all bindings from the node and its descendants. This includes local bindings used in
 * nested functions and arrow functions.
 */
export const getBindings = (
  node: ts.Node,
  context: Context,
  includeLocalBindings = false
): Set<Binding> => {
  const bindingSet = new Set<Binding>();

  visitSelfAndEachDescendant(node, (descendant) => {
    if (!ts.isIdentifier(descendant)) {
      return;
    }

    const bindingReference = BindingReferenceAugmentation.getValue(
      descendant,
      context
    );

    if (
      bindingReference != null &&
      (includeLocalBindings || !bindingReference.binding.isLocal(node))
    ) {
      bindingSet.add(bindingReference.binding);
    }
  });

  return bindingSet;
};

export const getSortedBindings = (
  node: ts.Node,
  context: Context,
  includeLocalBindings?: boolean
): Array<Binding> =>
  _.sortBy(
    Array.from(getBindings(node, context, includeLocalBindings)),
    (binding: Binding) => binding.name
  );
