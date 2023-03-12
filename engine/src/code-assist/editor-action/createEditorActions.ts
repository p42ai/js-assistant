import ts from "typescript";
import * as EditorOperation from "../../transformation/editor-operation/index";
import { EditorAction } from "./EditorAction";
import { createHighlightAction } from "./HighlightAction";
import { createInsertSnippetAction } from "./InsertSnippetAction";
import { createRenameAction } from "./RenameAction";
import { createSelectAction } from "./SelectAction";

export function createEditorActions(
  operations: EditorOperation.EditorOperation[],
  sourceFile: ts.SourceFile,
  offset: number
): Array<EditorAction> {
  return operations
    .map((operation) => {
      const { type } = operation;
      switch (type) {
        case "HIGHLIGHT":
          return createHighlightAction(operation, sourceFile, offset);
        case "INSERT_SNIPPET":
          return createInsertSnippetAction(operation, sourceFile, offset);
        case "RENAME":
          return createRenameAction(operation, sourceFile, offset);
        case "SELECT":
          return createSelectAction(operation, sourceFile, offset);
        default: {
          const exhaustiveCheck: never = type;
          throw new Error(`unsupported type: ${exhaustiveCheck}`);
        }
      }
    })
    .filter((action) => action != null) as Array<EditorAction>;
}
