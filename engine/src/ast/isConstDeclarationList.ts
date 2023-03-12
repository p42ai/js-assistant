import ts from "typescript";
import { Flags } from "../util/Flags";

export const isConstDeclarationList = (
  node: ts.Node
): node is ts.VariableDeclarationList =>
  ts.isVariableDeclarationList(node) &&
  Flags.isAnySet(node.flags, ts.NodeFlags.Const);
