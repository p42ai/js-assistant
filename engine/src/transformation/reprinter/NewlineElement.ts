import ts from "typescript";
import { ChildIterationContext } from "./ChildIterationContext";
import { Element } from "./Element";
import { ExtractionContext } from "./ExtractionContext";
import { ReprintContext } from "./ReprintContext";
import { NewlineSeparator } from "./Separator";
import { TriviaGatheringContext } from "./TriviaGatheringContext";

export class NewlineElement implements Element {
  private readonly newlineSeparator: NewlineSeparator;
  private readonly isFirstBlockLine: boolean;

  private whitespace: string | undefined = undefined;

  constructor(newlineSeparator: NewlineSeparator, isFirstBlockLine: boolean) {
    this.newlineSeparator = newlineSeparator;
    this.isFirstBlockLine = isFirstBlockLine;
  }

  emit(node: ts.Node, context: ReprintContext): string {
    return this.whitespace ?? this.newlineSeparator.emit(context);
  }

  extract(context: ExtractionContext): void {
    // extract whitespace (instead of newline and indent) - used when there is existing content
    let prefix = context.text.substring(
      this.isFirstBlockLine
        ? context.getPreviousChild().end
        : context.getPreviousChildEndAfterComments(),
      context.getNextChild().getStart()
    );

    if (this.isFirstBlockLine) {
      const lines = prefix.split(this.newlineSeparator.minimalSeparator);

      if (lines.length > 1) {
        const left = lines[1].trimLeft();

        prefix =
          lines[0] +
          this.newlineSeparator.minimalSeparator +
          (left === ""
            ? lines[1]
            : lines[1].substring(0, lines[1].indexOf(left)));
      }
    }

    this.whitespace = prefix;
  }

  gatherTrivia(
    iterationContext: ChildIterationContext,
    triviaContext: TriviaGatheringContext
  ) {
    // noop
  }
}
