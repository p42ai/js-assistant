import ts from "typescript";
import { resolveNodePath } from "../../ast/NodePath";
import { RenameOperation } from "../../transformation/editor-operation";

export type RenameAction = {
  type: "RENAME";
  position: number;
};

export function createRenameAction(
  operation: RenameOperation,
  sourceFile: ts.SourceFile,
  offset: number
): RenameAction | undefined {
  const node = resolveNodePath(operation.nodePath, sourceFile);

  return node !== null
    ? {
        type: "RENAME",
        position: offset + node!.getStart(sourceFile),
      }
    : undefined;
}
