import ts from "typescript";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";

export class ChildIterationContext {
  readonly children: Array<ts.Node>;
  childIndex: number;

  constructor(readonly parent: ts.Node, readonly tree: TransformedNodeTree) {
    this.children = parent
      .getChildren()
      .filter((node) => node.kind !== ts.SyntaxKind.JSDocComment);
    this.childIndex = 0;
  }

  // TODO rename (name only bc of ConditionContext)
  getNextChild() {
    return this.getCurrentChild();
  }

  getCurrentChild() {
    return this.children[this.childIndex];
  }

  getPreviousChild() {
    return this.children[this.childIndex - 1];
  }

  getNextChild2() {
    return this.children[this.childIndex + 1];
  }
}
