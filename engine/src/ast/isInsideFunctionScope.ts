import ts from "typescript";
import { getFunctionScopeNode } from "./ScopeNode";

export const isInsideFunctionScope = (node: ts.Node): boolean => {
  const functionScopeNode = getFunctionScopeNode(node);
  return functionScopeNode !== node.getSourceFile();
};
