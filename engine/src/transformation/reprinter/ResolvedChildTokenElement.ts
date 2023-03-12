import ts from "typescript";
import { Element } from "./Element";
import { ChildIterationContext } from "./ChildIterationContext";
import { ExtractionContext } from "./ExtractionContext";
import { ReprintContext } from "./ReprintContext";
import { TriviaGatheringContext } from "./TriviaGatheringContext";

export class ResolvedChildTokenElement<T extends ts.Node> implements Element {
  #resolver: (node: T) => ts.SyntaxKind | undefined;

  constructor(resolver: (node: T) => ts.SyntaxKind | undefined) {
    this.#resolver = resolver;
  }

  emit(node: ts.Node, context: ReprintContext): string {
    const resolvedValue = this.#resolver(node as T);
    return resolvedValue != null ? ts.tokenToString(resolvedValue) ?? "" : "";
  }

  extract(context: ExtractionContext) {
    context.nextChildIndex++;
  }

  gatherTrivia(
    iterationContext: ChildIterationContext,
    triviaContext: TriviaGatheringContext
  ) {
    iterationContext.childIndex++;
  }
}
