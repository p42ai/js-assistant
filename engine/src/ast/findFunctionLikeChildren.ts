import ts from "typescript";
import { FunctionLike, isFunctionLike } from "./FunctionLike";

export const findFunctionLikeChildren = (
  container: ts.Node
): Array<FunctionLike> => {
  const occurrences: Array<FunctionLike> = [];
  container.forEachChild(function occurrenceVisitor(child: ts.Node) {
    if (isFunctionLike(child)) {
      occurrences.push(child);
      return;
    }
    child.forEachChild(occurrenceVisitor);
  });
  return occurrences;
};
