import ts from "typescript";
import { Binding } from "../../augmentation/scope/Binding";
import { BindingReference } from "../../augmentation/scope/reference/BindingReference";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchIdentifier({
  text = undefined,
  binding = undefined,
  bindingReference = undefined,
  parent = undefined,
  constraints = undefined,
  debugName = "identifier",
}: {
  text?: p.PrimitivePredicateLike<string, Context>;
  binding?: p.OptionalPredicate<Binding | undefined, Context>;
  bindingReference?: p.OptionalPredicate<BindingReference | undefined, Context>;
  parent?: p.OptionalPredicate<ts.Node, Context>;
  constraints?: p.OptionalPredicateArray<ts.Identifier, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isIdentifier,
    b.mandatoryPrimitiveProperty("text", text),
    b.virtualProperty(
      "binding",
      (identifier, context) => context.getBinding(identifier),
      binding
    ),
    b.virtualProperty(
      "bindingReference",
      (identifier, context) => context.getBindingReference(identifier),
      bindingReference
    ),
    b.mandatoryProperty("parent", parent),
    b.constraints(constraints)
  );
}
