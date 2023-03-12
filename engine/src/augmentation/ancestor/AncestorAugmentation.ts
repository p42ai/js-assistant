import ts from "typescript";
import { Context } from "../../matcher/engine/Context";
import { arrayValueProvider } from "../../util/collection/ArrayValueProvider";
import { DeferredList } from "../../util/collection/DeferredList";
import { OnDemandAugmentation } from "../OnDemandAugmentation";

export const AncestorAugmentation = new OnDemandAugmentation<
  DeferredList<ts.Node, Context>
>({
  id: "ancestor",
  computeValue: (node: ts.Node) => {
    const ancestors: ts.Node[] = [];
    let parentNode = node.parent;
    while (parentNode != null) {
      ancestors.push(parentNode);
      parentNode = parentNode.parent;
    }
    return new DeferredList(arrayValueProvider(ancestors));
  },
});
