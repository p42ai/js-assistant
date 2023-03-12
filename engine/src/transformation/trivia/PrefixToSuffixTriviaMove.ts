import ts from "typescript";
import { TriviaManager } from "./TriviaManager";
import { TriviaUpdate } from "./TriviaUpdate";

export class PrefixToSuffixTriviaMove implements TriviaUpdate {
  constructor(private readonly from: ts.Node, private readonly to: ts.Node) {}

  addOverlays(triviaManager: TriviaManager) {
    const fromTrivia = triviaManager.get(this.from);

    if (fromTrivia == null) {
      return;
    }

    triviaManager.addOverlay(this.from, {
      prefix: "",
    });

    triviaManager.addOverlay(this.to, {
      suffix: fromTrivia.prefix,
    });
  }
}
