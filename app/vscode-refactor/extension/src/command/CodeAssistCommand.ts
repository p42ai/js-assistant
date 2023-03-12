import { CODE_ASSIST_COMMAND_ID } from "@p42/app-vscode-shared/build/code-assist/CodeAssistCommand";
import { Logger } from "@p42/app-vscode-shared/build/logger/Logger";
import * as p42 from "@p42/engine";
import * as vscode from "vscode";
import { convertOffsetRangeToVscodeRange } from "../util/text/convertOffsetRangeToVscodeRange";
import { createExecuteEditorAction } from "./editor-action/executeEditorAction";

export const executeCodeAssistCommand = async (
  codeAssistId: string,
  source: string | undefined
): Promise<void> =>
  vscode.commands.executeCommand(CODE_ASSIST_COMMAND_ID, codeAssistId, source);

export const registerCodeAssistCommand = ({
  context,
  logger,
  getCodeAssistAction,
  isCodeAssistAnimationEnabled,
}: {
  context: vscode.ExtensionContext;
  logger: Logger;
  getCodeAssistAction: (
    documentUri: string,
    codeAssistId: string
  ) => Promise<p42.CodeAssistAction | undefined>;
  isCodeAssistAnimationEnabled: () => boolean;
}) => {
  const executeEditorAction = createExecuteEditorAction({
    configuration: { isCodeAssistAnimationEnabled },
  });

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      CODE_ASSIST_COMMAND_ID,
      async function (
        textEditor: vscode.TextEditor,
        edit: vscode.TextEditorEdit,
        codeAssistId: string | undefined,
        source: string | undefined
      ) {
        const { document } = textEditor;

        try {
          if (codeAssistId == null) {
            logger.error({
              message: `Command '${CODE_ASSIST_COMMAND_ID}' was invoked without code assist id.`,
              path: vscode.workspace.asRelativePath(document.uri),
            });
            return;
          }

          const action = await getCodeAssistAction(
            document.uri.toString(),
            codeAssistId
          );

          if (action == null) {
            logger.error({
              message: `No action received for code assist '${codeAssistId}'.`,
              path: vscode.workspace.asRelativePath(document.uri),
            });
            return;
          }

          if (action.edit != null) {
            const { range: uiRange, replacement } = action.edit;
            try {
              const workspaceEdit = new vscode.WorkspaceEdit();
              workspaceEdit.replace(
                document.uri,
                convertOffsetRangeToVscodeRange(uiRange, document),
                replacement
              );

              await vscode.workspace.applyEdit(workspaceEdit);
            } catch (error: any) {
              logger.error({
                message: `Failed to apply code assist ${codeAssistId}.`,
                path: vscode.workspace.asRelativePath(document.uri),
                error,
              });
            }
          }

          if (action.postEditActions == null) {
            return;
          }

          for (const postEditAction of action.postEditActions) {
            try {
              await executeEditorAction(textEditor, postEditAction);
            } catch (error: any) {
              logger.error({
                message: `Failed to apply post-edit operation ${postEditAction.type} for ${codeAssistId}.`,
                path: vscode.workspace.asRelativePath(document.uri),
                error,
              });
            }
          }
        } catch (error) {
          logger.error({
            message: "executing code assist failed",
            path: vscode.workspace.asRelativePath(document.uri),
            error,
          });
        }
      }
    )
  );
};
