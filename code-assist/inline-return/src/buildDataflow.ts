
import { Binding, BindingReference, Flags } from "@p42/engine";
import ts from "typescript";
import { Dataflow } from "./Dataflow";
import { DataflowNode } from "./DataflowNode";
import { getFlowNode } from "./getFlowNode";

export function buildDataflow(binding: Binding): Dataflow | undefined {
  const dataflow = new Dataflow();

  // binding reference to flow node map
  const flowNodeToBindingReference = new Map<ts.FlowNode, BindingReference>();
  binding.references.forEach((reference) => {
    const flowNode = getFlowNode(reference.identifier);
    if (flowNode != null) {
      flowNodeToBindingReference.set(flowNode, reference);
    }
  });

  // flow nodes that need to be processed and added to the dataflow
  const currentTsFlowNodes = Array.from(flowNodeToBindingReference.keys());

  // links that need to be inserted
  const linksToInsert: Array<{
    from: ts.FlowNode;
    to: ts.FlowNode;
  }> = [];

  function createLink(from: DataflowNode, to: DataflowNode) {
    from.downstream.push(to);
    to.upstream.push(from);
  }

  function add(from: ts.FlowNode, to: ts.FlowNode) {
    // "to" has always been added to dataflow nodes already
    if (dataflow.nodes.has(from)) {
      createLink(dataflow.nodes.get(from)!, dataflow.nodes.get(to)!);
    } else {
      currentTsFlowNodes.push(from);
      linksToInsert.push({
        from,
        to,
      });
    }
  }

  while (currentTsFlowNodes.length > 0) {
    const currentTsFlowNode = currentTsFlowNodes.pop();

    if (currentTsFlowNode == null || dataflow.nodes.has(currentTsFlowNode)) {
      continue;
    }

    const dataflowNode = new DataflowNode(
      currentTsFlowNode,
      flowNodeToBindingReference.get(currentTsFlowNode)
    );
    dataflow.nodes.set(currentTsFlowNode, dataflowNode);

    // when reaching a flow start (in a function), abort this part:
    if (Flags.isSet(currentTsFlowNode.flags, ts.FlowFlags.Start)) {
      continue;
    }

    // antecedents (before antecendent which mutates array)
    const antecedents = (currentTsFlowNode as any).antecedents as
      | Array<ts.FlowNode>
      | undefined;
    if (antecedents != null) {
      for (const antecedent of antecedents) {
        add(antecedent, currentTsFlowNode);
      }
    }

    // antecedent
    const antecedent = (currentTsFlowNode as any).antecedent as
      | ts.FlowNode
      | undefined;
    if (antecedent != null) {
      add(antecedent, currentTsFlowNode);
    }
  }

  // insert outstanding links
  for (const link of linksToInsert) {
    createLink(dataflow.nodes.get(link.from)!, dataflow.nodes.get(link.to)!);
  }

  return dataflow;
}
