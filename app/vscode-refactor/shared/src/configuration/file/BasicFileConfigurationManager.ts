import { Logger } from "../../logger/Logger";
import { AsyncListenerSet } from "../../util/notification/AsyncListenerSet";
import { FileConfiguration } from "./FileConfiguration";
import {
  FileConfigurationManager,
  FileConfigurationManagerChangeEvent,
  FileConfigurationManagerListener,
} from "./FileConfigurationManager";

export class BasicFileConfigurationManager implements FileConfigurationManager {
  private readonly listeners = new AsyncListenerSet<
    FileConfigurationManagerChangeEvent,
    FileConfigurationManagerListener
  >();

  /** workspace folder uri to file content */
  private readonly contentByWorkspaceFolder = new Map<
    string,
    string | undefined
  >();

  constructor(private readonly logger: Logger) {}

  dispose() {
    // noop
  }

  private getContent(workspaceFolderUri: string): string | undefined {
    return this.contentByWorkspaceFolder.get(workspaceFolderUri);
  }

  hasConfigurationFile(workspaceFolderUri: string): Promise<boolean> {
    return Promise.resolve(this.getContent(workspaceFolderUri) !== undefined);
  }

  async getConfiguration(
    workspaceFolderUri: string
  ): Promise<FileConfiguration | undefined> {
    if (!(await this.hasConfigurationFile(workspaceFolderUri))) {
      return undefined;
    }

    // catch potential parsing errors that could crash e.g. the language server:
    try {
      return new FileConfiguration(this.getContent(workspaceFolderUri)!);
    } catch (error) {
      this.logger.warn(`could not load configuration`); // TODO include workspace and filename
      return undefined;
    }
  }

  async setContent(workspaceFolderUri: string, newContent: string | undefined) {
    this.contentByWorkspaceFolder.set(workspaceFolderUri, newContent);
    await this.listeners.notify({
      workspaceFolderUri,
      content: newContent ?? null,
    });
  }

  onConfigurationChange(listener: FileConfigurationManagerListener) {
    return this.listeners.add(listener);
  }
}
