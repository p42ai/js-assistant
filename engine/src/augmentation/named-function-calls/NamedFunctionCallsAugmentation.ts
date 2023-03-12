import ts from "typescript";
import { Context } from "../../matcher/engine/Context";
import { arrayValueProvider } from "../../util/collection/ArrayValueProvider";
import { DeferredList } from "../../util/collection/DeferredList";
import { OnDemandAugmentation } from "../OnDemandAugmentation";

export const NamedFunctionCallsAugmentation = new OnDemandAugmentation<
  DeferredList<ts.Node, Context> | undefined
>({
  id: "named-function-calls",
  computeValue: (node: ts.Node, context: Context) => {
    if (!ts.isFunctionDeclaration(node)) {
      return;
    }

    const { name } = node;
    if (name == null) {
      return; // TODO handle functions without name
    }

    const binding = context.getBinding(name);
    if (binding == null) {
      return; // TODO what does it mean if there's no binding?
    }

    const references = binding.readReferences;
    const callExpressions = [];

    for (const reference of references) {
      const node = reference.identifier;
      const { parent } = node;

      if (ts.isCallExpression(parent) && parent.expression === node) {
        callExpressions.push(parent);
      }
    }

    return new DeferredList(arrayValueProvider(callExpressions));
  },
});
