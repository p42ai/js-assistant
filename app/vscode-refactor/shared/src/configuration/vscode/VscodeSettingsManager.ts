import { Disposable } from "../../util/Disposable";
import { P42VscodeSettings } from "./P42VscodeSettings";

export type VscodeSettingsManagerListener = () => Promise<void>;

export interface VscodeSettingsManager extends Disposable {
  getSettings(): P42VscodeSettings;

  onSettingsChanged(listener: VscodeSettingsManagerListener): Disposable;
}
