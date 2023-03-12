import ts from "typescript";
import { findNodesContainingRange } from "./findNodesContainingRange";

export const findNodesContainingPosition = (
  position: number,
  sourceFile: ts.SourceFile
): Array<ts.Node> => findNodesContainingRange(position, position, sourceFile);
