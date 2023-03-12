import { Disposable } from "../../util/Disposable";
import { FileConfiguration } from "./FileConfiguration";

export type FileConfigurationManagerChangeEvent = {
  workspaceFolderUri: string;
  content: string | null;
};

export type FileConfigurationManagerListener = (
  event: FileConfigurationManagerChangeEvent
) => Promise<void>;

export interface FileConfigurationManager extends Disposable {
  hasConfigurationFile(workspaceFolderUri: string): Promise<boolean>;

  getConfiguration(
    workspaceFolderUri: string
  ): Promise<FileConfiguration | undefined>;

  onConfigurationChange(listener: FileConfigurationManagerListener): Disposable;
}
