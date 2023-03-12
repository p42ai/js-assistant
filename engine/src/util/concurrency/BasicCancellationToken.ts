import { AbstractCancellationToken } from "./AbstractCancellationToken";

export class BasicCancellationToken extends AbstractCancellationToken {
  private cancellationRequested = false;

  requestCancellation() {
    this.cancellationRequested = true;
  }

  isCancellationRequested() {
    return this.cancellationRequested;
  }
}
