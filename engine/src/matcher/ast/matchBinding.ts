import ts from "typescript";
import { Binding } from "../../augmentation/scope/Binding";
import { BindingKind } from "../../augmentation/scope/BindingKind";
import { BindingReference } from "../../augmentation/scope/reference/BindingReference";
import * as b from "../builder";
import { Context } from "../engine/Context";
import * as p from "../predicate";

const isBinding = (value: unknown): value is Binding =>
  value instanceof Binding;

export function matchBinding({
  kind = undefined,
  declaringNodes = undefined,
  readReferences = undefined,
  writeReferences = undefined,
  isConstant = undefined,
  constraints = undefined,
  debugName = "binding",
}: {
  kind?: p.PrimitivePredicateLike<BindingKind, Context>;
  declaringNodes?: p.OptionalPredicate<
    Array<ts.Identifier | ts.StringLiteral>,
    Context
  >;
  readReferences?: p.OptionalPredicate<Array<BindingReference>, Context>;
  writeReferences?: p.OptionalPredicate<Array<BindingReference>, Context>;
  isConstant?: p.PrimitivePredicateLike<boolean, Context>;
  constraints?: p.OptionalPredicateArray<Binding, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    isBinding,
    b.mandatoryPrimitiveProperty("kind", kind),
    b.mandatoryProperty("declaringNodes", declaringNodes),
    b.mandatoryProperty("readReferences", readReferences),
    b.mandatoryProperty("writeReferences", writeReferences),
    b.mandatoryPrimitiveProperty("isConstant", isConstant),
    b.constraints(constraints)
  );
}
