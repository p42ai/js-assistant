import * as p42 from "@p42/engine";
import * as vscode from "vscode";
import { readFileContent } from "../util/fs/readFileContent";

export class WorkspaceFileContent extends p42.Content {
  constructor(private readonly fileUri: vscode.Uri) {
    // TODO better extension handling??
    super(vscode.workspace.asRelativePath(fileUri), undefined);
  }

  async load() {
    try {
      return readFileContent(this.fileUri);
    } catch (error) {
      throw p42.asStructuredError(error, p42.CodeAssistErrorType.READ_ERROR);
    }
  }
}
