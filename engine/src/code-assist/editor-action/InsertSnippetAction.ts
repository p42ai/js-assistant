import ts from "typescript";
import { resolveNodePath } from "../../ast/NodePath";
import { InsertSnippetOperation } from "../../transformation/editor-operation";

export type InsertSnippetAction = {
  type: "INSERT_SNIPPET";
  position: number;
  snippet: string;
};

export function createInsertSnippetAction(
  operation: InsertSnippetOperation,
  sourceFile: ts.SourceFile,
  offset: number
): InsertSnippetAction | undefined {
  const node = resolveNodePath(operation.nodePath, sourceFile);

  return node !== null
    ? {
        type: "INSERT_SNIPPET",
        position: offset + node!.getStart(sourceFile),
        snippet: operation.snippet,
      }
    : undefined;
}
