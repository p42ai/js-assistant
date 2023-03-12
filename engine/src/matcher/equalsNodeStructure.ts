import ts from "typescript";
import { isNodeStructureEqual } from "../ast/isNodeStructureEqual.generated";
import { Context } from "./engine/Context";
import * as p from "./predicate";

export const equalsNodeStructure = (reference: ts.Node) =>
  p.define("equalsNodeStructure", (node: ts.Node, context: Context): boolean =>
    isNodeStructureEqual(reference, node, context)
  );
