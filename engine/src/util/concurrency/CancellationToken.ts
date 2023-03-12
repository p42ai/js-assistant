// Note: API matches TypeScript CancellationToken API (except for the exception class identity)
export interface CancellationToken {
  /**
   * Throws a OperationCanceledException when the token has been cancelled.
   */
  throwIfCancellationRequested(): void;

  deferAndThrowIfCancellationRequested(): Promise<void>;

  isCancellationRequested(): boolean;
}
