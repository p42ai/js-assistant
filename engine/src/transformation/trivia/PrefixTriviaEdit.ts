import ts from "typescript";
import { separateWhitespacePrefix } from "../../util/text/separateWhitespacePrefix";
import { TriviaManager } from "./TriviaManager";
import { TriviaUpdate } from "./TriviaUpdate";

export class PrefixTriviaEdit implements TriviaUpdate {
  constructor(
    private readonly from: ts.Node,
    private readonly prefix: string
  ) {}

  addOverlays(triviaManager: TriviaManager) {
    const fromTrivia = triviaManager.get(this.from);

    if (fromTrivia == null) {
      return;
    }

    const from = separateWhitespacePrefix(fromTrivia.prefix ?? "");

    triviaManager.addOverlay(this.from, {
      prefix: this.prefix + from.remainder,
    });
  }
}
