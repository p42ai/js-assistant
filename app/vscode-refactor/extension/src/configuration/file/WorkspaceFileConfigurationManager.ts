import { FileConfiguration } from "@p42/app-vscode-shared/build/configuration/file/FileConfiguration";
import {
  FileConfigurationManager,
  FileConfigurationManagerChangeEvent,
  FileConfigurationManagerListener,
} from "@p42/app-vscode-shared/build/configuration/file/FileConfigurationManager";
import { Logger } from "@p42/app-vscode-shared/build/logger/Logger";
import { AsyncListenerSet } from "@p42/app-vscode-shared/build/util/notification/AsyncListenerSet";
import * as vscode from "vscode";
import { getWorkspaceFolderFromUriString } from "../../util/fs/getWorkspaceFolderFromUriString";

/**
 * FileConfigurationManager that works on a VS Code virtual workspace.
 */
export class WorkspaceFileConfigurationManager
  implements FileConfigurationManager
{
  private readonly listeners = new AsyncListenerSet<
    FileConfigurationManagerChangeEvent,
    FileConfigurationManagerListener
  >();

  private readonly watcher: vscode.FileSystemWatcher;

  constructor(readonly fileName: string, private readonly logger: Logger) {
    // TODO reduce overmatching (should only match on root level of workspace folders)
    this.watcher = vscode.workspace.createFileSystemWatcher(
      `**/${this.fileName}`
    );

    const notifyListeners = async (fileUri: vscode.Uri) => {
      // TODO what if a workspace gets deleted?
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(fileUri);
      const workspaceFolderUri = workspaceFolder!.uri.toString();
      return this.listeners.notify({
        workspaceFolderUri,
        content:
          (await this.getConfigurationContent(workspaceFolderUri)) ?? null,
      });
    };

    this.watcher.onDidChange(notifyListeners);
    this.watcher.onDidCreate(notifyListeners);
    this.watcher.onDidDelete(notifyListeners);
  }

  dispose() {
    this.watcher.dispose();
  }

  private getConfigurationFileUri(workspaceFolder: vscode.WorkspaceFolder) {
    return vscode.Uri.joinPath(workspaceFolder.uri, this.fileName);
  }

  async hasConfigurationFile(workspaceFolderUri: string): Promise<boolean> {
    const workspaceFolder = getWorkspaceFolderFromUriString(workspaceFolderUri);
    try {
      await this.stat(workspaceFolder);
      return true;
    } catch {
      return false;
    }
  }

  private async stat(
    workspaceFolder: vscode.WorkspaceFolder
  ): Promise<vscode.FileStat> {
    const configFileUri = this.getConfigurationFileUri(workspaceFolder);
    return vscode.workspace.fs.stat(configFileUri);
  }

  async getConfigurationContent(
    workspaceFolderUri: string
  ): Promise<string | undefined> {
    if (!(await this.hasConfigurationFile(workspaceFolderUri))) {
      return undefined;
    }

    const workspaceFolder = getWorkspaceFolderFromUriString(workspaceFolderUri);
    const configFileUri = this.getConfigurationFileUri(workspaceFolder);
    const configData = await vscode.workspace.fs.readFile(configFileUri);
    return Buffer.from(configData).toString("utf8");
  }

  async getConfiguration(
    workspaceFolderUri: string
  ): Promise<FileConfiguration | undefined> {
    // catch potential parsing errors:
    try {
      const configText = await this.getConfigurationContent(workspaceFolderUri);
      return configText == null ? undefined : new FileConfiguration(configText);
    } catch (error) {
      this.logger.warn(`could not load configuration ${this.fileName}`);
      return undefined;
    }
  }

  onConfigurationChange(listener: FileConfigurationManagerListener) {
    return this.listeners.add(listener);
  }
}
