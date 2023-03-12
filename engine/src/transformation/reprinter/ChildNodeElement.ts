import ts from "typescript";
import { ChildIterationContext } from "./ChildIterationContext";
import { Element } from "./Element";
import { ExtractionContext } from "./ExtractionContext";
import { getNodeEndIncludingTrailingComments } from "./getNodeEndIncludingTrailingComments";
import { ReprintContext } from "./ReprintContext";
import { TriviaGatheringContext } from "./TriviaGatheringContext";

export class ChildNodeElement implements Element {
  #property: string;
  #indent = false;
  #checkIndent: boolean;

  constructor(property: string, checkIndent: boolean) {
    this.#property = property;
    this.#checkIndent = checkIndent;
  }

  emit(node: ts.Node, context: ReprintContext): string {
    const childNode = (node as any)[this.#property] as ts.Node;

    if (childNode == null) {
      return "";
    }

    if (this.#indent) {
      context.indentationLevel++;
    }

    const nodeTrivia = context.trivia.get(context.getOriginalNode(childNode));

    let text = "";
    if (nodeTrivia?.prefix != null) {
      text += nodeTrivia?.prefix.trimLeft();
    }

    text += context.reprintNode(childNode);

    if (nodeTrivia?.suffix != null) {
      text += nodeTrivia?.suffix.trimRight();
    }

    if (this.#indent) {
      context.indentationLevel--;
    }

    return text;
  }

  extract(context: ExtractionContext) {
    // identify indentation
    if (this.#checkIndent) {
      const node = context.original;
      if (node != null) {
        this.#indent =
          context.getStartLine(node) <
          context.getStartLine(context.getProperty(this.#property) as ts.Node);
      }
    }

    context.nextChildIndex++;
  }

  gatherTrivia(
    iterationContext: ChildIterationContext,
    triviaContext: TriviaGatheringContext
  ) {
    const node = iterationContext.getCurrentChild();
    const { parent } = node;

    // prefix has to start after parent start (otherwise the trivia should be captured on the parent)
    const prefixStart = Math.max(
      parent.getStart(),
      iterationContext.getPreviousChild()?.getEnd() ?? node.pos
    );

    const suffixEnd =
      iterationContext.getNextChild2()?.getStart() ??
      getNodeEndIncludingTrailingComments(node, triviaContext.fullText);

    triviaContext.recordTrivia(
      node,
      {
        pos: prefixStart,
        end: node.getStart(),
      },
      {
        pos: node.getEnd(),
        end: suffixEnd,
      },
      {
        pos: node.getEnd(),
        end: suffixEnd,
      },
      undefined,
      false,
      false
    );

    // recursion
    triviaContext.gatherChildTrivia(node);

    iterationContext.childIndex++;
  }
}
