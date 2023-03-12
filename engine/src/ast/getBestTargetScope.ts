import * as ts from "typescript";
import { Scope } from "../augmentation/scope/Scope";
import { ast } from "../matcher";
import { Context } from "../matcher/engine/Context";
import * as p from "../matcher/predicate";
import * as AssignmentExpression from "./AssignmentExpression";
import { findClones } from "./findClones";
import { getBindings } from "./getBindings";
import * as VariableDeclaration from "./VariableDeclaration";

// TODO extract into engine?
const isAssignmentTarget = p.or(
  AssignmentExpression.isLeftSideOf(),
  VariableDeclaration.isNameOf()
);

const isInvalidOccurrence = p.or(
  isAssignmentTarget,
  ast.identifier({
    bindingReference: (reference) => reference?.isDeclaration ?? false,
  })
);

// TODO extract and re-use in select occurrences refactoring
// TODO consider this scope when this is used in expression
// TODO consider arguments when used in expression
export const getBestTargetScope = (
  expression: ts.Expression,
  context: Context
) => {
  const findOccurrences = (container: ts.Node) =>
    findClones(expression, container, context).filter(
      (node) => !isInvalidOccurrence(node, context)
    );

  const bindings = Array.from(getBindings(expression, context));
  const areAllBindingsAvailable = (scope: Scope) =>
    bindings.every((binding) => binding.isAvailableInScope(scope));

  let currentScope: Scope | undefined = context.getScope(expression);
  let bestScope = currentScope;
  let bestOccurrences = findOccurrences(currentScope.node!);

  while (
    currentScope.parent != null &&
    !currentScope.parent.isGlobalScope() &&
    areAllBindingsAvailable(currentScope.parent)
  ) {
    currentScope = currentScope.parent;

    // TODO could be more efficient by not re-searching inner node
    const newOccurrences = findOccurrences(currentScope.node!);
    if (newOccurrences.length > bestOccurrences.length) {
      bestScope = currentScope;
      bestOccurrences = newOccurrences;
    }
  }

  return {
    targetScope: bestScope,
    occurrences: bestOccurrences,
  };
};
