import ts from "typescript";
import { TriviaManager } from "./TriviaManager";
import { TriviaUpdate } from "./TriviaUpdate";

export class SwapPositionSuffixTriviaMove implements TriviaUpdate {
  constructor(private readonly from: ts.Node, private readonly to: ts.Node) {}

  addOverlays(triviaManager: TriviaManager) {
    const fromTrivia = triviaManager.get(this.from);

    if (fromTrivia == null) {
      return;
    }

    const toTrivia = triviaManager.get(this.to);

    triviaManager.addOverlay(this.from, {
      hasTrailingSeparator: toTrivia?.hasTrailingSeparator,
      isNodeRegionEnd: toTrivia?.isNodeRegionEnd,
    });
    triviaManager.addOverlay(this.to, {
      hasTrailingSeparator: fromTrivia?.hasTrailingSeparator,
      isNodeRegionEnd: fromTrivia?.isNodeRegionEnd,
    });
  }
}
