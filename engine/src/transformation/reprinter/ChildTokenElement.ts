import ts from "typescript";
import { Element } from "./Element";
import { ChildIterationContext } from "./ChildIterationContext";
import { ExtractionContext } from "./ExtractionContext";
import { ReprintContext } from "./ReprintContext";
import { TriviaGatheringContext } from "./TriviaGatheringContext";

export class ChildTokenElement implements Element {
  private property: string;

  constructor(property: string) {
    this.property = property;
  }

  emit(node: ts.Node, context: ReprintContext): string {
    return ts.tokenToString((node as any)[this.property] as ts.SyntaxKind)!;
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
