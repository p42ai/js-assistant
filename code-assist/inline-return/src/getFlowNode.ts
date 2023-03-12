
import ts from "typescript";

export function getFlowNode(node: ts.Node): ts.FlowNode | undefined {
  return (node as any).flowNode as ts.FlowNode | undefined;
}
