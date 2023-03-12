import ts from "typescript";
import { BindingKind } from "./BindingKind";
import { BindingReference } from "./reference/BindingReference";
import { ImportInformation } from "./import/ImportInformation";
import { Scope } from "./Scope";
import { isAncestor } from "../../ast/isAncestor";

export type BindingDeclaration = {
  kind: BindingKind;
  name: string;
  symbol?: ts.Symbol | undefined;
  importInformation?: ImportInformation | undefined;
};

/**
 * A name binding that associates identifiers in a scope.
 */
export class Binding {
  /**
   * References to this binding.
   */
  readonly references: Array<BindingReference> = [];

  /**
   * The defining occurrence(s) of this binding.
   *
   * For modules, values can be a StringLiteral, e.g. `declare module 'a' { ... }`.
   *
   * For global properties, this is undefined.
   *
   * In TypeScript, named functions can be overloaded.
   * In this case, every declaration overload is added as a declaring node.
   */
  readonly declaringNodes: Array<ts.Identifier | ts.StringLiteral> = [];

  // Performance: calculate on-demand and cache:
  #readReferences: Array<BindingReference> | undefined;
  #writeReferences: Array<BindingReference> | undefined;
  #nonDeclarationWriteReferences: Array<BindingReference> | undefined;

  public get readReferences(): Array<BindingReference> {
    if (this.#readReferences == null) {
      this.#readReferences = this.references.filter(
        (reference) => reference.isRead
      );
    }
    return this.#readReferences!;
  }

  public get writeReferences(): Array<BindingReference> {
    if (this.#writeReferences == null) {
      this.#writeReferences = this.references.filter(
        (reference) => reference.isWrite
      );
    }
    return this.#writeReferences!;
  }

  public get nonDeclarationWriteReferences(): Array<BindingReference> {
    if (this.#nonDeclarationWriteReferences == null) {
      this.#nonDeclarationWriteReferences = this.references.filter(
        (reference) => reference.isWrite && !reference.isDeclaration
      );
    }
    return this.#nonDeclarationWriteReferences!;
  }

  /**
   * Scope that this binding belongs to.
   */
  readonly scope: Scope;

  readonly importInformation: ImportInformation | undefined;

  readonly kind: BindingKind;

  readonly name: string;

  /**
   * For globals, symbol is undefined.
   */
  readonly symbol: ts.Symbol | undefined;

  constructor(declaration: BindingDeclaration, scope: Scope) {
    this.kind = declaration.kind;
    this.symbol = declaration.symbol;
    this.name = declaration.name;
    this.importInformation = declaration.importInformation;
    this.scope = scope;
  }

  get isGlobal() {
    return this.declaringNodes.length === 0;
  }

  get isConstant() {
    return this.nonDeclarationWriteReferences.length === 0;
  }

  /**
   * @returns true if the binding is available in scope and not shadowed.
   */
  isAvailableInScope(scope: Scope): boolean {
    return this.isGlobal || scope.getBinding(this.name) === this;
  }

  /**
   * @returns true when there there are additional var declaration (after the original one that creates
   * the binding)
   */
  isDeclaredMultipleTimes() {
    return this.declaringNodes.length > 1;
  }

  /**
   * @returns true when the binding is local to the specified node. A local binding is a binding that is
   * defined inside the node.
   */
  isLocal(node: ts.Node): boolean {
    const scopeNode = this.scope.node;
    return scopeNode != null && isAncestor(scopeNode, node);
  }
}
