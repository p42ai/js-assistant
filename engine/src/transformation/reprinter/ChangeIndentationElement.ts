import ts from "typescript";
import { ChildIterationContext } from "./ChildIterationContext";
import { Element } from "./Element";
import { ExtractionContext } from "./ExtractionContext";
import { ReprintContext } from "./ReprintContext";
import { TriviaGatheringContext } from "./TriviaGatheringContext";

export class ChangeIndentationElement implements Element {
  #property: string;
  #direction: "increase" | "decrease";
  #amount: number;

  constructor(
    property: string,
    direction: "increase" | "decrease",
    amount = 1
  ) {
    this.#property = property;
    this.#direction = direction;
    this.#amount = amount;
  }

  private getChangeAmount() {
    switch (this.#direction) {
      case "increase":
        return this.#amount;
      case "decrease":
        return -this.#amount;
    }
  }

  emit(node: ts.Node, context: ReprintContext): string {
    context.indentationLevel += this.getChangeAmount();
    return "";
  }

  extract(context: ExtractionContext) {
    // extract indentation from original
    const nodes = context.getProperty(this.#property) as ts.NodeArray<ts.Node>;

    // if the start lines of the last element and the parent (current node) are
    // different, assume indentation:
    if (nodes.length > 0) {
      this.#amount =
        context.getStartLine(context.original) <
        context.getStartLine(nodes[nodes.length - 1])
          ? 1
          : 0;
    }
  }

  gatherTrivia(
    iterationContext: ChildIterationContext,
    triviaContext: TriviaGatheringContext
  ) {
    triviaContext.indentationLevel += this.getChangeAmount();
  }
}
