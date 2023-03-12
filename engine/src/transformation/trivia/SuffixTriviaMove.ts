import ts from "typescript";
import { TriviaManager } from "./TriviaManager";
import { TriviaUpdate } from "./TriviaUpdate";

export class SuffixTriviaMove implements TriviaUpdate {
  constructor(private readonly from: ts.Node, private readonly to: ts.Node) {}

  addOverlays(triviaManager: TriviaManager) {
    const fromTrivia = triviaManager.get(this.from);

    if (fromTrivia == null) {
      return;
    }

    triviaManager.addOverlay(this.from, {
      suffix: "",
      isNodeRegionEnd: false,
    });

    triviaManager.addOverlay(this.to, {
      suffix: fromTrivia.suffix,
      isNodeRegionEnd: fromTrivia.isNodeRegionEnd,
    });
  }
}
