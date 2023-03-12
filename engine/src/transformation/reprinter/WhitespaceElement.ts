import ts from "typescript";
import { ChildIterationContext } from "./ChildIterationContext";
import { Element } from "./Element";
import { ExtractionContext } from "./ExtractionContext";
import { ReprintContext } from "./ReprintContext";
import { TriviaGatheringContext } from "./TriviaGatheringContext";

export type WhitespaceExtractionMode =
  | "full"
  | "prefixWhitespace"
  | "suffixWhitespace";

// TODO unify with newline element
export class WhitespaceElement implements Element {
  private readonly mode: WhitespaceExtractionMode;

  private whitespace: string;

  constructor(
    whitespace: string | undefined = "",
    mode: WhitespaceExtractionMode
  ) {
    this.whitespace = whitespace;
    this.mode = mode;
  }

  emit(node: ts.Node, context: ReprintContext): string {
    return this.whitespace;
  }

  extract(context: ExtractionContext): void {
    if (context.nextChildIndex === 0) {
      return;
    }

    const start = context.getPreviousChild().getEnd();
    const end = context.getNextChild().getStart();

    // extract whitespace (instead of newline and indent) - used when there is existing content
    let whitespace = context.text.substring(start, end);

    if (this.mode === "prefixWhitespace") {
      const content = whitespace.trimLeft();
      if (content !== "") {
        whitespace = whitespace.substring(0, whitespace.indexOf(content));
      }
    } else if (this.mode === "suffixWhitespace") {
      const content = whitespace.trimRight();
      if (content !== "") {
        whitespace = whitespace.substring(content.length);
      }
    }

    this.whitespace = whitespace;
  }

  gatherTrivia(
    iterationContext: ChildIterationContext,
    triviaContext: TriviaGatheringContext
  ) {
    // noop
  }
}
