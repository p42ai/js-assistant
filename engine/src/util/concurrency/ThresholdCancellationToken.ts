import { defer } from "../concurrency/defer";
import { CancellationToken } from "./CancellationToken";

export class ThresholdCancellationToken implements CancellationToken {
  private lastCheck: number | undefined = undefined;

  constructor(
    readonly thresholdInMilliseconds: number,
    readonly delegate: CancellationToken
  ) {}

  throwIfCancellationRequested(): void {
    return this.delegate.throwIfCancellationRequested();
  }

  async deferAndThrowIfCancellationRequested(): Promise<void> {
    const currentTime = Date.now();

    if (
      this.lastCheck == null ||
      this.thresholdInMilliseconds < currentTime - this.lastCheck
    ) {
      this.lastCheck = currentTime;
      await defer();
      this.throwIfCancellationRequested();
    }
  }

  isCancellationRequested(): boolean {
    return this.delegate.isCancellationRequested();
  }
}
