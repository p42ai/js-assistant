import ts from "typescript";
import { Binding } from "../Binding";

export class BindingReference {
  constructor(
    readonly identifier: ts.Identifier,
    readonly binding: Binding,

    /**
     * True when this binding reference changes the value of the variable.
     * This is the case for declarations that initialize the variable,
     * for increment expressions (e.g. a++), and for assignments.
     */
    readonly isWrite: boolean,

    /**
     * True when the expression surrounding the identifier read the variable value.
     * This is the case for regular reads (e.g. property access or value reads),
     * for increment expressions (e.g. a++) which need to access the current value,
     * and for update expression that modify the current value (e.g. *=).
     */
    readonly isRead: boolean,

    /**
     * True when the binding reference could be affected by a with statement, i.e.
     * the binding would not be resolved if a property with the same name exists
     * on the object that is passed into the with statement.
     */
    readonly isAffectedByWith: boolean
  ) {}

  get isDeclaration() {
    return this.binding.declaringNodes.includes(this.identifier);
  }
}

export function isBindingReference(object: any): object is BindingReference {
  return object instanceof BindingReference;
}
