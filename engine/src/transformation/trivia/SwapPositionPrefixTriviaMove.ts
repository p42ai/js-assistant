import ts from "typescript";
import { separateWhitespacePrefix } from "../../util/text/separateWhitespacePrefix";
import { TriviaManager } from "./TriviaManager";
import { TriviaUpdate } from "./TriviaUpdate";

export class SwapPositionPrefixTriviaMove implements TriviaUpdate {
  constructor(private readonly from: ts.Node, private readonly to: ts.Node) {}

  addOverlays(triviaManager: TriviaManager) {
    const fromTrivia = triviaManager.get(this.from);

    if (fromTrivia == null) {
      return;
    }

    const toTrivia = triviaManager.get(this.to);

    const from = separateWhitespacePrefix(fromTrivia.prefix ?? "");
    const to = separateWhitespacePrefix(toTrivia?.prefix ?? "");

    triviaManager.addOverlay(this.from, {
      prefix: to.prefix + from.remainder,
      isNodeRegionStart: toTrivia?.isNodeRegionStart,
    });

    triviaManager.addOverlay(this.to, {
      prefix: from.prefix + to.remainder,
      isNodeRegionStart: fromTrivia?.isNodeRegionStart,
    });
  }
}
