import ts from "typescript";
import { getId } from "../../ast/getId";
import { ScopeNode } from "../../ast/ScopeNode";
import { Binding, BindingDeclaration } from "./Binding";

export class Scope {
  readonly bindings: Map<string, Binding>;

  constructor(
    /**
     * Scope node, e.g. the function or block this scope belongs to.
     * Undefined for the global scope.
     */
    readonly node: ScopeNode | undefined,
    /**
     * Parent scope.
     * Undefined for the global scope.
     */
    readonly parent: Scope | undefined,
    /**
     * True when the scope is a special scope of a 'with' element.
     */
    readonly isWithScope: boolean = false
  ) {
    this.bindings = new Map<string, Binding>();
  }

  declareBinding(bindingDeclaration: BindingDeclaration): Binding {
    const binding = new Binding(bindingDeclaration, this);
    this.bindings.set(binding.name, binding);
    return binding;
  }

  /**
   * Returns all bindings that are available in this scope. This includes
   * non-shadowed variables from parent scopes.
   */
  getBindings(): Map<string, Binding> {
    const bindings = new Map(this.bindings);

    const availableParentBindings: Map<string, Binding> | undefined =
      this.parent?.getBindings();
    if (availableParentBindings != null) {
      for (const parentBinding of availableParentBindings.values()) {
        if (!bindings.has(parentBinding.name)) {
          bindings.set(parentBinding.name, parentBinding);
        }
      }
    }

    return bindings;
  }

  /**
   * Checks if a binding exists in this scope. This includes bindings that
   * are available because of scope inheritance.
   *
   * @param name
   * @param node
   *        Optional node at which the binding should be available.
   *        It is assumed that the node is part of this scope.
   *        If the binding is in its temporal dead zone (TDZ)
   *        for const/let/param bindings at the
   *        position of node, false is returned.
   */
  hasBinding(name: string, node?: ts.Node | undefined): boolean {
    const binding = this.getBinding(name);

    if (node == null || binding == null) {
      return binding != null;
    }

    if (binding.isGlobal) {
      return true;
    }

    // TODO hoisted variables are available in the full function scope
    // same for param, catch clause etc.

    // for non-global non-var bindings, there is a single declaring node:
    const bindingStart = binding.declaringNodes[0]!.getStart();
    return bindingStart! <= node.getStart();
  }

  /**
   * Checks if a binding is declared in this scope. It will **not**
   * check declarations in parent scopes.
   */
  isBindingDeclared(name: string): boolean {
    return this.bindings.has(name);
  }

  getBinding(name: string): Binding | undefined {
    return this.bindings.get(name) ?? this.parent?.getBinding(name);
  }

  isTopLevelScope(): boolean {
    return !this.isGlobalScope() && this.parent!.isGlobalScope();
  }

  isGlobalScope(): boolean {
    return this.parent == null;
  }

  toLogObject(): any {
    return {
      node: getId(this.node),
      bindings: [...this.bindings.keys()],
      parent: this.parent?.toLogObject(),
    };
  }
}
