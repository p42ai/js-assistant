import * as p42 from "@p42/engine";
import * as vscode from "vscode";
import { EditorActionExecutor } from "./EditorActionExecutor";
import { HighlightExecutor } from "./HighlightExecutor";
import { InsertSnippetExecutor } from "./InsertSnippetExecutor";
import { RenameExecutor } from "./RenameExecutor";
import { SelectExecutor } from "./SelectExecutor";

export const createExecuteEditorAction = ({
  configuration,
}: {
  configuration: {
    isCodeAssistAnimationEnabled: () => boolean;
  };
}) => {
  const actionExecutors: {
    [K in p42.EditorAction["type"]]: EditorActionExecutor<p42.EditorAction>;
  } = {
    HIGHLIGHT: new HighlightExecutor(configuration),
    INSERT_SNIPPET: new InsertSnippetExecutor(),
    SELECT: new SelectExecutor(),
    RENAME: new RenameExecutor(),
  };

  return async (textEditor: vscode.TextEditor, action: p42.EditorAction) => {
    actionExecutors[action.type].execute(textEditor, action);
  };
};
