import ts from "typescript";
import { getId } from "./getId";

export const findNodeById = (
  root: ts.Node,
  nodeId: string
): ts.Node | undefined => {
  let result: ts.Node | undefined = undefined;
  (function visitor(node: ts.Node) {
    if (getId(node) === nodeId) {
      result = node;
      return;
    }
    ts.forEachChild(node, visitor);
  })(root);
  return result;
};
