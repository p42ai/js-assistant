import ts from "typescript";
import { NodeTransformationState } from "../NodeTransformationState";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";
import { NodeTrivia, TriviaManager } from "../trivia/TriviaManager";
import { Indenter } from "./indenter/Indenter";
import { Reprinter } from "./Reprinter";

export class ReprintContext {
  #movedNodes: Array<ts.Node>;

  tree: TransformedNodeTree;
  reprinter: Reprinter;

  private indenter: Indenter;
  indentationLevel: number;

  readonly trivia: TriviaManager;

  fullText: string;

  readonly start: number;

  constructor(
    tree: TransformedNodeTree,
    reprinter: Reprinter,
    indentationLevel: number,
    indenter: Indenter,
    start: number,
    trivia: TriviaManager
  ) {
    this.tree = tree;
    this.reprinter = reprinter;
    this.indentationLevel = indentationLevel;
    this.indenter = indenter;
    this.start = start;
    this.trivia = trivia;

    this.#movedNodes = tree.getMovedNodes();
    this.fullText = tree.originalSource.getFullText();
  }

  addParenthesesIfNeeded(text: string, node: ts.Node): string {
    const shouldParenthesize =
      this.tree.needsParentheses(node) &&
      (!text.startsWith("(") || !text.endsWith(")"));

    return shouldParenthesize ? `(${text})` : text;
  }

  hasBeenMoved(node: ts.Node): boolean {
    return this.#movedNodes.includes(node);
  }

  // return true when a true parent swap has happened
  hasTrulyBeenMoved(node: ts.Node): boolean {
    const originalParent = this.getOriginalNode(node)?.parent;
    return (
      originalParent != null &&
      this.tree.getModifiedNodeForOriginal(originalParent) !==
        this.getParent(node)
    );
  }

  reIndent(
    text: string,
    node: ts.Node,
    targetIndentation: number = this.indentationLevel
  ): string {
    return this.indenter.reIndentReplacementText(
      text,
      targetIndentation,
      ts.isTemplateSpan(node)
    );
  }

  getParent(node: ts.Node): ts.Node | undefined {
    return this.tree.getNodeInformation(node)?.parent;
  }

  // return true if node has been moved and
  // a. indentation levels have changed, or
  // b. the node got attached to one of the original ancestors (up tree)
  needsReindentation(
    node: ts.Node,
    nodeTrivia: (NodeTrivia & { isOverlay?: boolean | undefined }) | undefined
  ): boolean {
    if (nodeTrivia == null) {
      return false;
    }

    if (nodeTrivia.isOverlay === true) {
      return true;
    }

    if (!this.hasTrulyBeenMoved(node)) {
      return false;
    }

    if (this.indentationLevel !== nodeTrivia.indentationLevel) {
      return true;
    }

    let originalAncestor = this.getOriginalNode(node)?.parent;

    if (originalAncestor == null) {
      return false;
    }

    const parent = this.getParent(node);

    if (parent == null) {
      return false;
    }

    const parentOriginal = this.getOriginalNode(parent);

    if (parentOriginal == null) {
      return false;
    }

    while (originalAncestor != null) {
      originalAncestor = originalAncestor.parent;

      if (originalAncestor === parentOriginal) {
        return true;
      }
    }

    return false;
  }

  getOriginalNode(node: ts.Node): ts.Node | undefined {
    return this.isOriginal(node) ? node : this.tree.getOriginalNode(node);
  }

  isNew(node: ts.Node): boolean {
    return this.tree.isNew(node);
  }

  isOriginal(node: ts.Node): boolean {
    return this.tree.isOriginal(node);
  }

  isCopied(node: ts.Node): boolean {
    return this.tree.getNodeTransformationInfo(node).source != null;
  }

  getOriginalOrCopiedText(node: ts.Node): string {
    const transformationInfo = this.tree.getNodeTransformationInfo(node);
    return (transformationInfo.source ?? node).getText(
      this.tree.originalSource
    );
  }

  isModified(node: ts.Node): boolean {
    return this.tree.isModified(node);
  }

  getTransformationState(node: ts.Node): NodeTransformationState | undefined {
    return this.tree.getNodeTransformationState(node);
  }

  reprintNode(node: ts.Node): string {
    return this.reprinter.reprintNode(node, this);
  }

  isRemoved(node: ts.Node): boolean {
    return this.tree.isRemoved(node);
  }

  getTrailingComments(node: ts.Node): Array<ts.CommentRange> | undefined {
    return ts.getTrailingCommentRanges(this.fullText, node.end);
  }
}
