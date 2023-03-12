import * as vscode from "vscode";
import { LanguageServerFacade } from "../language-service-client/LanguageServerFacade";
import { OutputChannelLogger } from "../log/OutputChannelLogger";
import { isDirectory } from "../util/fs/isDirectory";
import { DependencyVisualizationEditor } from "./DependencyVisualizationEditor";

export const createDependencyVisualizationCommand =
  ({
    logger,
    languageServer,
    extensionUri,
  }: {
    logger: OutputChannelLogger;
    languageServer: LanguageServerFacade;
    extensionUri: vscode.Uri;
  }) =>
  async (folderUri: vscode.Uri) => {
    if (!(await isDirectory(folderUri))) {
      // TODO show error message
      return;
    }

    try {
      DependencyVisualizationEditor.create({
        extensionUri,
        folderUri,
      });
    } catch (error: any) {
      logger.error({
        message: `Creating dependency visualization failed: ${error?.message}`,
        error,
      });
    }
  };
