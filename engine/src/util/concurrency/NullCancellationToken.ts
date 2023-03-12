import { AbstractCancellationToken } from "./AbstractCancellationToken";

class NullCancellationTokenClass extends AbstractCancellationToken {
  isCancellationRequested(): boolean {
    return false;
  }
}

export const NullCancellationToken = new NullCancellationTokenClass();
