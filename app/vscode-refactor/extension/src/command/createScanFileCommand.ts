import * as vscode from "vscode";
import { LanguageServerFacade } from "../language-service-client/LanguageServerFacade";
import { OutputChannelLogger } from "../log/OutputChannelLogger";
import { ScanResultEditor } from "../panel/scan-result-editor/ScanResultEditor";

export const createScanFileCommand =
  ({
    logger,
    languageServer,
    extensionUri,
  }: {
    logger: OutputChannelLogger;
    languageServer: LanguageServerFacade;
    extensionUri: vscode.Uri;
  }) =>
  async (uri: vscode.Uri) => {
    // TODO should spawn max one editor for each file (keep references by name somehow)
    await ScanResultEditor.create({
      languageServer,
      extensionUri,
      documentUri: uri,
    });
  };
