import ts from "typescript";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";
import { ReprintTemplate } from "./ReprintTemplate";
import { TriviaManager } from "../trivia/TriviaManager";

export class TriviaGatheringContext {
  readonly trivia: TriviaManager;

  indentationLevel: number;

  constructor(
    readonly tree: TransformedNodeTree,
    baseIndentationLevel: number,
    readonly fullText: string,
    readonly templates: Map<ts.SyntaxKind, ReprintTemplate>,

    /**
     * Limit on start position - text prior to this position (e.g. leading comments)
     * is excluded from trivia gathering. Used to prevent gathering e.g. copyright
     * headers or large unrelated comment blocks for the outermost node.
     */
    readonly extractionStart: number
  ) {
    this.indentationLevel = baseIndentationLevel;

    this.trivia = new TriviaManager();
  }

  gatherChildTrivia(node: ts.Node) {
    this.templates.get(node.kind)?.gatherTrivia(node, this);
  }

  recordTrivia(
    node: ts.Node,
    prefixRange: ts.TextRange,
    suffixRange: ts.TextRange,
    originalSuffixRange: ts.TextRange,
    hasTrailingSeparator: boolean | undefined,
    isNodeRegionStart: boolean,
    isNodeRegionEnd: boolean
  ) {
    this.trivia.set(node, {
      prefix: this.fullText.substring(
        Math.max(this.extractionStart, prefixRange.pos), // prevent parsing prior comments to avoid duplication
        prefixRange.end
      ),
      suffix: this.fullText.substring(suffixRange.pos, suffixRange.end),
      originalSuffix: this.fullText.substring(
        originalSuffixRange.pos,
        originalSuffixRange.end
      ),
      indentationLevel: this.indentationLevel,
      hasTrailingSeparator,
      isNodeRegionStart,
      isNodeRegionEnd,
    });
  }
}
