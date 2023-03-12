import ts from "typescript";
import { Condition } from "./Condition";
import { Element } from "./Element";
import { ChildIterationContext } from "./ChildIterationContext";
import { ExtractionContext } from "./ExtractionContext";
import { ReprintContext } from "./ReprintContext";
import { TriviaGatheringContext } from "./TriviaGatheringContext";

export class ConditionalElement implements Element {
  #condition: Condition;
  #delegate: Element;
  #extractionResult: boolean | undefined;

  constructor(condition: Condition, delegate: Element) {
    this.#condition = condition;
    this.#delegate = delegate;
  }

  emit(node: ts.Node, context: ReprintContext): string {
    return this.#condition.emitCondition(
      node,
      context.tree,
      this.#extractionResult,
      context
    )
      ? this.#delegate.emit(node, context)
      : "";
  }

  extract(context: ExtractionContext): void {
    this.#extractionResult = this.#condition.extractCondition(
      context.original,
      context.tree,
      context
    );

    if (this.#extractionResult) {
      this.#delegate.extract(context);
    }
  }

  gatherTrivia(
    iterationContext: ChildIterationContext,
    triviaContext: TriviaGatheringContext
  ) {
    const shouldExtract = this.#condition.extractCondition(
      iterationContext.parent,
      iterationContext.tree,
      iterationContext
    );

    if (shouldExtract) {
      this.#delegate.gatherTrivia(iterationContext, triviaContext);
    }
  }
}
