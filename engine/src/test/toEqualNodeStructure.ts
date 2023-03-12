import ts from "typescript";
import { getId } from "../ast/getId";
import { getSyntaxKindLabel } from "../ast/getSyntaxKindLabel";
import { isNodeStructureEqual } from "../ast/isNodeStructureEqual.generated";
import { Context } from "../matcher/engine/Context";

export function toEqualNodeStructure(
  received: ts.Node,
  expectedNode: ts.Node,
  context: Context
) {
  const receivedId = getId(received);
  const expectedNodeId =
    getId(expectedNode) ?? getSyntaxKindLabel(expectedNode.kind);

  return isNodeStructureEqual(received, expectedNode, context)
    ? {
        message: () =>
          `${receivedId} equal to expected node structure ${expectedNodeId}`,
        pass: true,
      }
    : {
        message: () =>
          `${receivedId} is not equal to expected node structure ${expectedNodeId}`,
        pass: false,
      };
}
