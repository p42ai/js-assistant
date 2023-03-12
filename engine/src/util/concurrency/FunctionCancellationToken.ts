import { AbstractCancellationToken } from "./AbstractCancellationToken";

export class FunctionCancellationToken extends AbstractCancellationToken {
  constructor(readonly isCancellationRequested: () => boolean) {
    super();
  }
}
