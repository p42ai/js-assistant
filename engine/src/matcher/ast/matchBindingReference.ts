import ts from "typescript";
import { Binding } from "../../augmentation/scope/Binding";
import {
  BindingReference,
  isBindingReference,
} from "../../augmentation/scope/reference/BindingReference";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

export function matchBindingReference({
  identifier = undefined,
  binding = undefined,
  isDeclaration = undefined,
  isWrite = undefined,
  isRead = undefined,
  constraints = undefined,
  debugName = "bindingReference",
}: {
  identifier?: p.OptionalPredicate<ts.Identifier, Context>;
  binding?: p.OptionalPredicate<Binding, Context>;
  isDeclaration?: p.PrimitivePredicateLike<boolean, Context>;
  isWrite?: p.PrimitivePredicateLike<boolean, Context>;
  isRead?: p.PrimitivePredicateLike<boolean, Context>;
  constraints?: p.OptionalPredicateArray<BindingReference, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    isBindingReference,
    b.mandatoryProperty("identifier", identifier),
    b.mandatoryProperty("binding", binding),
    b.mandatoryPrimitiveProperty("isDeclaration", isDeclaration),
    b.mandatoryPrimitiveProperty("isWrite", isWrite),
    b.mandatoryPrimitiveProperty("isRead", isRead),
    b.constraints(constraints)
  );
}
