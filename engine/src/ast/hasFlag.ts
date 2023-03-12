import ts from "typescript";
import { Flags } from "../util/Flags";

export function hasFlag(node: ts.Node, flag: number): boolean {
  return Flags.isSet(node.flags, flag);
}
