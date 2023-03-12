import ts from "typescript";
import { ChildIterationContext } from "./ChildIterationContext";
import { Element } from "./Element";
import { ExtractionContext } from "./ExtractionContext";
import { ReprintContext } from "./ReprintContext";
import { TriviaGatheringContext } from "./TriviaGatheringContext";

export class ReprintTemplate {
  private elementFactories: Array<() => Element>;

  constructor(elementFactories: Array<() => Element>) {
    this.elementFactories = elementFactories;
  }

  // get structure as elements (incl. default values)
  private createElements() {
    return this.elementFactories.map((createElement) => createElement());
  }

  /**
   * Gather trivia records the trivia for the current node and recursively gathers the
   * trivia for the children of the node.
   */
  gatherTrivia(node: ts.Node, triviaContext: TriviaGatheringContext) {
    // gather for relevant children (details decided in reprint template)
    const iterationContext = new ChildIterationContext(
      node,
      triviaContext.tree
    );
    const elements = this.createElements();
    for (const element of elements) {
      // stop iteration if all children have been visited
      if (iterationContext.childIndex >= iterationContext.children.length) {
        break;
      }

      element.gatherTrivia(iterationContext, triviaContext);
    }
  }

  reprint(node: ts.Node, context: ReprintContext): string {
    const elements = this.createElements();

    // extract: read whitespace from original when it is available and of the same type
    if (context.isModified(node)) {
      const originalNode = context.getOriginalNode(node)!;

      // Original and node can have different kinds when there is a replacement
      // TODO maybe a "replaced" class is better for this
      if (originalNode.kind === node.kind) {
        const extractionContext = new ExtractionContext(
          originalNode,
          context.tree
        );

        for (const element of elements) {
          element.extract(extractionContext);
        }
      }
    }

    // emit: combine the concrete values of node
    // with keywords & extracted/default whitespace
    let text = "";
    for (const element of elements) {
      text += element.emit(node, context);
    }

    return context.addParenthesesIfNeeded(text, node);
  }
}
