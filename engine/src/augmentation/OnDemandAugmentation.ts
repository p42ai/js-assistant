import ts from "typescript";
import { Context } from "../matcher/engine/Context";

export class OnDemandAugmentation<VALUE> {
  readonly type = "on-demand";
  readonly id;

  readonly computeValue;

  constructor({
    id,
    computeValue,
  }: {
    id: string;
    computeValue: (node: ts.Node, context: Context) => VALUE;
  }) {
    this.id = id;
    this.computeValue = computeValue;
  }

  getValue(node: ts.Node, context: Context): VALUE {
    const augmentationValues = context.getNodeAugmentationValues(this);
    const value = augmentationValues.get(node);

    if (value != null) {
      return value;
    }

    // lazy computation
    const computedValue = this.computeValue(node, context);
    augmentationValues.set(node, computedValue);
    return computedValue;
  }
}
