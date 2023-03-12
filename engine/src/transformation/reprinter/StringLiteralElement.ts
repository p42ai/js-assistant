import ts from "typescript";
import { isSingleQuote } from "../../ast/isSingleQuote";
import { escapeChar } from "../../util/text/escapeChar";
import { ChildIterationContext } from "./ChildIterationContext";
import { Element } from "./Element";
import { ExtractionContext } from "./ExtractionContext";
import { ReprintContext } from "./ReprintContext";
import { TriviaGatheringContext } from "./TriviaGatheringContext";

export class StringLiteralElement implements Element {
  private readonly isSingleQuoteDefault: boolean;

  constructor(isSingleQuoteDefault: boolean) {
    this.isSingleQuoteDefault = isSingleQuoteDefault;
  }

  private getQuoteCharacter(
    stringLiteral: ts.StringLiteral,
    context: ReprintContext
  ): string {
    const singleQuote =
      isSingleQuote(stringLiteral, context.tree) ?? this.isSingleQuoteDefault;
    return singleQuote ? "'" : '"';
  }

  emit(node: ts.Node, context: ReprintContext): string {
    const stringLiteral = node as ts.StringLiteral;

    // The text for modified / new nodes is assumed to be escaped. This is required
    // to preserve the original form of escaped characters.
    // Unfortunately in the parsed stringElement.text property this distinction is lost.
    // See getRawStringLiteralText() for how to recover it.
    const quoteCharacter = this.getQuoteCharacter(stringLiteral, context);
    const escapedText = escapeChar(quoteCharacter, stringLiteral.text);

    return `${quoteCharacter}${escapedText}${quoteCharacter}`;
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
