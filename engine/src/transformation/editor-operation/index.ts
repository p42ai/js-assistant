import { HighlightOperation } from "./HighlightOperation";
import { SelectOperation } from "./SelectOperation";
import { RenameOperation } from "./RenameOperation";
import { InsertSnippetOperation } from "./InsertSnippetOperation";

export type EditorOperation =
  | HighlightOperation
  | InsertSnippetOperation
  | SelectOperation
  | RenameOperation;

export {
  keepExistingSelection,
  select,
  selectNodes,
  SelectOperation,
} from "./SelectOperation";

export { rename, renameNode, RenameOperation } from "./RenameOperation";

export {
  highlight,
  highlightNodes,
  HighlightOperation,
} from "./HighlightOperation";

export {
  insertSnippet,
  insertSnippetBeforeNode,
  InsertSnippetOperation,
} from "./InsertSnippetOperation";

export const compose = (
  ...operations: Array<EditorOperation | undefined>
): Array<EditorOperation> | undefined => {
  const filteredOperations = operations.filter(
    (operation) => operation != null
  );

  return filteredOperations.length === 0
    ? undefined
    : (filteredOperations as Array<EditorOperation>);
};
