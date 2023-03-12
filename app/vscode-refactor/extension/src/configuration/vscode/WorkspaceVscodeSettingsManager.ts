import * as vscode from "vscode";
import {
  P42VscodeSettings,
  P42VscodeSettingsKey,
} from "@p42/app-vscode-shared/build/configuration/vscode/P42VscodeSettings";
import {
  VscodeSettingsManager,
  VscodeSettingsManagerListener,
} from "@p42/app-vscode-shared/build/configuration/vscode/VscodeSettingsManager";
import { Disposable } from "@p42/app-vscode-shared/build/util/Disposable";
import { AsyncListenerSet } from "@p42/app-vscode-shared/build/util/notification/AsyncListenerSet";
import { DomainInformation } from "./DomainInformation";

export class WorkspaceVscodeSettingsManager implements VscodeSettingsManager {
  private readonly listeners = new AsyncListenerSet<
    void,
    VscodeSettingsManagerListener
  >();

  private listenerDisposable: Disposable;

  constructor() {
    this.listenerDisposable = vscode.workspace.onDidChangeConfiguration(
      (event) => {
        if (event.affectsConfiguration(P42VscodeSettingsKey)) {
          this.listeners.notify();
        }
      }
    );
  }

  dispose() {
    this.listenerDisposable.dispose();
  }

  getSettings(): P42VscodeSettings {
    return vscode.workspace
      .getConfiguration()
      .get(P42VscodeSettingsKey) as P42VscodeSettings;
  }

  get extensionMode(): NonNullable<P42VscodeSettings["extensionMode"]> {
    return this.getSettings().extensionMode ?? "production";
  }

  get isCloudAiEnabled(): boolean {
    return this.getSettings().feature.cloudAI.enabled ?? false;
  }

  get domainInformation(): DomainInformation {
    switch (this.extensionMode) {
      case "local-development":
        return new DomainInformation({
          baseUrl: "http://localhost:30800",
          host: "localhost",
          port: 30800,
          scheme: "http",
        });
      case "production":
        return new DomainInformation({
          baseUrl: "https://p42.ai",
          host: "p42.ai",
          port: 443,
          scheme: "https",
        });
      default:
        throw new Error(`unsupported extension mode '${this.extensionMode}'`);
    }
  }

  onSettingsChanged(listener: VscodeSettingsManagerListener): Disposable {
    return this.listeners.add(listener);
  }
}
