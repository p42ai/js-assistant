import { Edit } from "../transformation/reprinter/Edit";
import { EditorAction } from "./editor-action/EditorAction";

export type CodeAssistAction = {
  /**
   * Edit that should be applied to the current document.
   */
  readonly edit: Edit | undefined;

  /**
   * Actions that should be executed on the edited document. The range
   * positions are using the content of the edited document.
   */
  readonly postEditActions?: Array<EditorAction> | undefined;
};
