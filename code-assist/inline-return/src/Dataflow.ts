
import ts from "typescript";
import { DataflowNode } from "./DataflowNode";
import { getFlowNode } from "./getFlowNode";

export class Dataflow {
  readonly nodes = new Map<ts.FlowNode, DataflowNode>();

  getDownstreamNodes(node: ts.Node): Set<DataflowNode> | undefined {
    const tsFlownode = getFlowNode(node);

    if (tsFlownode == null) {
      return undefined;
    }

    const dataflowNode = this.nodes.get(tsFlownode);

    if (dataflowNode == null) {
      return undefined;
    }

    const downstreamNodes = new Set<DataflowNode>();

    const currentNodes = [dataflowNode];
    while (currentNodes.length > 0) {
      const currentDownstreamNodes = currentNodes.pop()!.downstream;
      for (const currentDownstreamNode of currentDownstreamNodes) {
        if (!downstreamNodes.has(currentDownstreamNode)) {
          // TODO can lead to infinite loop
          if (node !== (currentDownstreamNode.tsFlowNode as any).node) {
            downstreamNodes.add(currentDownstreamNode);
          }
          currentNodes.push(currentDownstreamNode);
        }
      }
    }

    return downstreamNodes;
  }

  getUpstreamNodes(node: ts.Node): Set<DataflowNode> | undefined {
    const tsFlownode = getFlowNode(node);

    if (tsFlownode == null) {
      return undefined;
    }

    const dataflowNode = this.nodes.get(tsFlownode);

    if (dataflowNode == null) {
      return undefined;
    }

    const upstreamNodes = new Set<DataflowNode>();

    const currentNodes = [dataflowNode];
    while (currentNodes.length > 0) {
      const currentUpstreamNodes = currentNodes.pop()!.upstream;
      for (const currentUpstreamNode of currentUpstreamNodes) {
        if (!upstreamNodes.has(currentUpstreamNode)) {
          // TODO can lead to infinite loop
          if (node !== (currentUpstreamNode.tsFlowNode as any).node) {
            upstreamNodes.add(currentUpstreamNode);
          }
          currentNodes.push(currentUpstreamNode);
        }
      }
    }

    return upstreamNodes;
  }
}
