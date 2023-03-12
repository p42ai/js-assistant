import { defer } from "./defer";
import { CancellationToken } from "./CancellationToken";
import { OperationCanceledException } from "./OperationCanceledException";

export abstract class AbstractCancellationToken implements CancellationToken {
  throwIfCancellationRequested() {
    if (this.isCancellationRequested()) {
      throw new OperationCanceledException();
    }
  }

  async deferAndThrowIfCancellationRequested(): Promise<void> {
    await defer();
    this.throwIfCancellationRequested();
  }

  abstract isCancellationRequested(): boolean;
}
