import ts from "typescript";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";

export class ExtractionContext {
  /**
   * Children excluding JSDoc comments (which are handled like other comments).
   */
  children: Array<ts.Node>;

  text: string;
  original: ts.Node;

  nextChildIndex = 0;

  constructor(original: ts.Node, readonly tree: TransformedNodeTree) {
    this.original = original;
    this.text = original.getSourceFile().getFullText();
    this.children = original
      .getChildren()
      .filter((node) => node.kind !== ts.SyntaxKind.JSDocComment);
  }

  getPreviousChild(): ts.Node {
    return this.children[this.nextChildIndex - 1];
  }

  getPreviousChildEndAfterComments(): number {
    const previousChild = this.getPreviousChild();
    return Math.max(
      previousChild.end,
      ...(ts
        .getTrailingCommentRanges(this.text, previousChild.end)
        ?.map((comment) => comment.end) ?? [])
    );
  }

  getNextChild(): ts.Node {
    return this.children[this.nextChildIndex];
  }

  getProperty(property: string) {
    return (this.original as any)[property];
  }

  getStartLine(node: ts.Node): number {
    return this.original
      .getSourceFile()
      .getLineAndCharacterOfPosition(node.getStart()).line;
  }
}
