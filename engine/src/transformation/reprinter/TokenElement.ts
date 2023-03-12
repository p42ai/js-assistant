import ts from "typescript";
import { Element } from "./Element";
import { ChildIterationContext } from "./ChildIterationContext";
import { ExtractionContext } from "./ExtractionContext";
import { ReprintContext } from "./ReprintContext";
import { TriviaGatheringContext } from "./TriviaGatheringContext";

export class TokenElement implements Element {
  #tokenKind: ts.TokenSyntaxKind;

  constructor(tokenKind: ts.TokenSyntaxKind) {
    this.#tokenKind = tokenKind;
  }

  emit(node: ts.Node, context: ReprintContext): string {
    return ts.tokenToString(this.#tokenKind)!;
  }

  extract(context: ExtractionContext) {
    // Tokens can be optional, e.g. semicolons might or might not appear after
    // statements. Only increase counter when the token is present:
    if (context.getNextChild().kind === this.#tokenKind)
      context.nextChildIndex++;
  }

  gatherTrivia(
    iterationContext: ChildIterationContext,
    triviaContext: TriviaGatheringContext
  ) {
    if (iterationContext.getCurrentChild().kind === this.#tokenKind)
      iterationContext.childIndex++;
  }
}
