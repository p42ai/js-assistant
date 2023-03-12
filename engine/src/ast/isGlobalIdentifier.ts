import ts from "typescript";
import { Context } from "../matcher/engine/Context";

export const isGlobalIdentifier = (
  node: ts.Node,
  context: Context,
  identifierText: string
): node is ts.Identifier =>
  ts.isIdentifier(node) &&
  context.getBinding(node)?.isGlobal === true &&
  node.getText() === identifierText;
