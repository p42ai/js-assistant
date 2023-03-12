import ts from "typescript";
import { TriviaManager } from "./TriviaManager";
import { TriviaUpdate } from "./TriviaUpdate";

export class TrailingSeparatorTriviaEdit implements TriviaUpdate {
  constructor(
    private readonly from: ts.Node,
    private readonly hasTrailingSeparator: boolean
  ) {}

  addOverlays(triviaManager: TriviaManager) {
    const fromTrivia = triviaManager.get(this.from);

    if (fromTrivia == null) {
      return;
    }

    triviaManager.addOverlay(this.from, {
      hasTrailingSeparator: this.hasTrailingSeparator,
    });
  }
}
