import { HighlightAction } from "./HighlightAction";
import { InsertSnippetAction } from "./InsertSnippetAction";
import { RenameAction } from "./RenameAction";
import { SelectAction } from "./SelectAction";

export type EditorAction =
  | HighlightAction
  | InsertSnippetAction
  | RenameAction
  | SelectAction;
