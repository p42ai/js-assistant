import { Disposable } from "../Disposable";

export class AsyncListenerSet<S, T extends (param: S) => Promise<void>> {
  private readonly listeners: Set<T> = new Set();

  add(listener: T): Disposable {
    const { listeners } = this;

    listeners.add(listener);
    return Object.freeze({
      dispose() {
        listeners.delete(listener);
      },
    });
  }

  async notify(param: S) {
    // TODO parallel invocation
    for (const listener of this.listeners) {
      await listener(param);
    }
  }
}
