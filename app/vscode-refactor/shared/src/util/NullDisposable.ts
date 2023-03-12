import { Disposable } from "./Disposable";

export const NullDisposable: Disposable = Object.freeze({
  dispose() {
    // noop
  },
});
