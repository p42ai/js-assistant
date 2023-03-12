import ts from "typescript";
import { TriviaManager } from "./TriviaManager";
import { TriviaUpdate } from "./TriviaUpdate";

export class TrailingSeparatorTriviaMove implements TriviaUpdate {
  constructor(
    private readonly from: ts.Node,
    private readonly to: ts.Node,
    private readonly newFromValue = false
  ) {}

  addOverlays(triviaManager: TriviaManager) {
    const fromTrivia = triviaManager.get(this.from);

    if (fromTrivia == null) {
      return;
    }

    triviaManager.addOverlay(this.from, {
      hasTrailingSeparator: this.newFromValue,
    });

    triviaManager.addOverlay(this.to, {
      hasTrailingSeparator: fromTrivia.hasTrailingSeparator,
    });
  }
}
