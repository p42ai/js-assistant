import ts from "typescript";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

// TODO binding support
export function matchPrivateIdentifier({
  text = undefined,
  // binding = undefined,
  // bindingReference = undefined,
  constraints = undefined,
  debugName = "privateIdentifier",
}: {
  text?: p.PrimitivePredicateLike<string, Context>;
  // binding?: p.OptionalPredicate<Binding | undefined, Context>;
  // bindingReference?: p.OptionalPredicate<BindingReference | undefined, Context>;
  constraints?: p.OptionalPredicateArray<ts.PrivateIdentifier, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.isPrivateIdentifier,
    b.mandatoryPrimitiveProperty("text", text),
    // b.virtualProperty(
    //   "binding",
    //   (identifier, context) => context.getBinding(identifier),
    //   binding
    // ),
    // b.virtualProperty(
    //   "bindingReference",
    //   (identifier, context) => context.getBindingReference(identifier),
    //   bindingReference
    // ),
    b.constraints(constraints)
  );
}
