import ts from "typescript";
import { visitSelfAndEachDescendant } from "../../ast/visitSelfAndEachDescendant";
import { Context } from "../../matcher/engine/Context";
import { arrayValueProvider } from "../../util/collection/ArrayValueProvider";
import { DeferredList } from "../../util/collection/DeferredList";
import { OnDemandAugmentation } from "../OnDemandAugmentation";

export const DescendantAugmentation = new OnDemandAugmentation<
  DeferredList<ts.Node, Context>
>({
  id: "descendant",
  computeValue: (node: ts.Node) => {
    const descendants: ts.Node[] = [];
    visitSelfAndEachDescendant(node, (descendant) => {
      descendants.push(descendant);
    });
    return new DeferredList(arrayValueProvider(descendants));
  },
});
