import * as p42 from "@p42/engine";
import { Disposable } from "../util/Disposable";
import { AsyncListenerSet } from "../util/notification/AsyncListenerSet";
import { Configuration } from "./Configuration";
import { FileConfigurationManager } from "./file/FileConfigurationManager";
import { VscodeSettingsManager } from "./vscode/VscodeSettingsManager";

export type ConfigurationManagerListener = () => Promise<void>;

export class ConfigurationManager implements Disposable {
  private readonly listeners = new AsyncListenerSet<
    void,
    ConfigurationManagerListener
  >();

  private readonly workspaceFolderConfigurations: Map<
    // key: workspace folder uri as string
    // null key: undefined workspace
    string | null,
    Configuration
  > = new Map();

  constructor(
    private readonly fileConfigurationManager: FileConfigurationManager,
    private readonly vscodeSettingsManager: VscodeSettingsManager
  ) {
    const clearCacheAndNotifyListeners = async () => {
      this.workspaceFolderConfigurations.clear();
      return this.listeners.notify();
    };

    this.vscodeSettingsManager.onSettingsChanged(clearCacheAndNotifyListeners);
    this.fileConfigurationManager.onConfigurationChange(
      clearCacheAndNotifyListeners
    );
  }

  dispose(): void {
    this.vscodeSettingsManager.dispose();
    this.fileConfigurationManager.dispose();
  }

  private getSettings() {
    return this.vscodeSettingsManager.getSettings();
  }

  getLoggingSettings() {
    return this.getSettings().logging;
  }

  getPerformanceLogLevel(): p42.PerformanceLogLevel | "off" {
    return this.getLoggingSettings()?.performance ?? "off";
  }

  getSuggestionBadgeVisibility() {
    return this.getSettings().suggestionBadge;
  }

  shouldOnlyShowP42CodeAssists() {
    return (
      this.getSettings().overlappingCodeAssistVisibility ===
      "Show only P42 code assists"
    );
  }

  isCodeAssistAnimationEnabled(): boolean {
    return this.getSettings()?.animation?.codeAssist === "all";
  }

  /**
   * Returns the configuration for the URI of a file, path or workspace.
   */
  async getConfiguration(
    workspaceFolderUri: string | undefined
  ): Promise<Configuration> {
    return (
      this.getCachedConfiguration(workspaceFolderUri) ??
      this.loadAndCacheConfiguration(workspaceFolderUri ?? null)
    );
  }

  private getCachedConfiguration(workspaceFolderUri: string | undefined) {
    return this.workspaceFolderConfigurations.get(workspaceFolderUri ?? null);
  }

  private async loadAndCacheConfiguration(
    workspaceFolderUri: string | null
  ): Promise<Configuration> {
    const configuration = new Configuration(
      workspaceFolderUri,
      workspaceFolderUri != null
        ? await this.fileConfigurationManager.getConfiguration(
            workspaceFolderUri
          )
        : undefined,
      this.getSettings()
    );

    this.workspaceFolderConfigurations.set(
      workspaceFolderUri ?? null,
      configuration
    );

    return configuration;
  }

  onConfigurationUpdate(listener: ConfigurationManagerListener) {
    return this.listeners.add(listener);
  }
}
