
import { BindingReference } from "@p42/engine";
import ts from "typescript";

export class DataflowNode {
  readonly tsFlowNode: ts.FlowNode;
  readonly bindingReference: BindingReference | undefined;

  readonly upstream: Array<DataflowNode> = [];
  readonly downstream: Array<DataflowNode> = [];

  constructor(
    tsFlowNode: ts.FlowNode,
    bindingReference: BindingReference | undefined
  ) {
    this.tsFlowNode = tsFlowNode;
    this.bindingReference = bindingReference;
  }
}
