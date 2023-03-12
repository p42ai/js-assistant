import ts from "typescript";
import { getScopeNode } from "../../ast/ScopeNode";
import { TypeSystem } from "../../ast/TypeSystem";
import { AncestorAugmentation } from "../../augmentation/ancestor/AncestorAugmentation";
import { Augmentation } from "../../augmentation/Augmentation";
import { DescendantAugmentation } from "../../augmentation/descendant/DescendantAugmentation";
import { OnDemandAugmentation } from "../../augmentation/OnDemandAugmentation";
import { BindingReference } from "../../augmentation/scope/reference/BindingReference";
import { BindingReferenceAugmentation } from "../../augmentation/scope/reference/BindingReferenceAugmentation";
import { ScopeAugmentation } from "../../augmentation/scope/ScopeAugmentation";
import { TrueParentAugmentation } from "../../augmentation/true-parent/TrueParentAugmentation";
import { Range } from "../../util/text/Range";
import { NodeIndex } from "./NodeIndex";
import { ScriptMetadata } from "./ScriptMetadata";

export class Context {
  // performance: cache core node -> value maps
  #bindingReferenceMap = this.#getAugmentationMap(BindingReferenceAugmentation);
  #scopeMap = this.#getAugmentationMap(ScopeAugmentation);
  #trueParentMap = this.#getAugmentationMap(TrueParentAugmentation);
  #ancestorsMap = this.#getAugmentationMap(AncestorAugmentation);
  #descendantsMap = this.#getAugmentationMap(DescendantAugmentation);

  constructor(
    readonly typeSystem: TypeSystem,
    readonly scriptMetadata: ScriptMetadata,

    /**
     * Optional range defining a selection in the UI. Undefined
     * for headless or bulk operations.
     *
     * TODO figure out how to separate request-specific values from AST-constant values.
     */
    readonly selectedRange: Range | undefined,

    readonly nodes: NodeIndex,

    /**
     * Raw node augmentation data.
     */
    private nodeAugmentationValues: Map<string, Map<ts.Node, unknown>>,

    /**
     * Raw file augmentation data.
     */
    private fileAugmentationValues: Map<string, unknown>
  ) {}

  #getAugmentationMap<VALUE>(augmentation: Augmentation<VALUE>) {
    return this.nodeAugmentationValues.get(augmentation.id) as Map<
      ts.Node,
      VALUE
    >;
  }

  #getOnDemandValue<VALUE>(
    node: ts.Node,
    augmentation: OnDemandAugmentation<VALUE>,
    values: Map<ts.Node, VALUE>
  ): VALUE {
    const value = values.get(node);

    if (value != null) {
      return value;
    }

    const computedValue = augmentation.computeValue(node, this);
    values.set(node, computedValue);
    return computedValue;
  }

  getNodeAugmentationValues<VALUE>(
    augmentation: Augmentation<VALUE>
  ): Map<ts.Node, VALUE> {
    return this.nodeAugmentationValues.get(augmentation.id) as any; // TODO type safety?
  }

  getFileAugmentationValue<VALUE>(augmentation: Augmentation<VALUE>): VALUE {
    return this.fileAugmentationValues.get(augmentation.id) as any; // TODO type safety?
  }

  // performance-optimized methods for accessing core augmentations:
  getScope(node: ts.Node) {
    return this.#scopeMap.get(getScopeNode(node))!;
  }

  getBindingReference(identifier: ts.Identifier): BindingReference | undefined {
    return this.#bindingReferenceMap.get(identifier);
  }

  getBinding(identifier: ts.Identifier) {
    return this.getBindingReference(identifier)?.binding;
  }

  getTrueParent(node: ts.Node) {
    return this.#getOnDemandValue(
      node,
      TrueParentAugmentation,
      this.#trueParentMap
    );
  }

  getAncestors(node: ts.Node) {
    return this.#getOnDemandValue(
      node,
      AncestorAugmentation,
      this.#ancestorsMap
    );
  }

  getDescendants(node: ts.Node) {
    return this.#getOnDemandValue(
      node,
      DescendantAugmentation,
      this.#descendantsMap
    );
  }
}
