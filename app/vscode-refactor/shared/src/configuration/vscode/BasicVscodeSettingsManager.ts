import { AsyncListenerSet } from "../../util/notification/AsyncListenerSet";
import { P42VscodeSettings } from "./P42VscodeSettings";
import {
  VscodeSettingsManager,
  VscodeSettingsManagerListener,
} from "./VscodeSettingsManager";

export class BasicVscodeSettingsManager implements VscodeSettingsManager {
  private readonly listeners = new AsyncListenerSet<
    void,
    VscodeSettingsManagerListener
  >();

  private settings: P42VscodeSettings | undefined;

  dispose() {
    // noop
  }

  onSettingsChanged(listener: VscodeSettingsManagerListener) {
    return this.listeners.add(listener);
  }

  getSettings(): P42VscodeSettings {
    if (this.settings == null) {
      throw new Error(`capabilities are not initialized`);
    }

    return this.settings;
  }

  async setSettings(settings: P42VscodeSettings) {
    this.settings = settings;
    await this.listeners.notify();
  }
}
