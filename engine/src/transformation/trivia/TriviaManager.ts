import ts from "typescript";
import { getId } from "../../ast/getId";

export type NodeTrivia = {
  prefix: string | undefined;

  /**
   * Range of the direct suffix. This will not include suffixes that can
   * be associated with the last child.
   */
  suffix: string | undefined;

  /**
   * Range of the suffix, including suffixes that might also be associated
   * to the children of the node. This is used when reprinting an original
   * node (to avoid suffix loss).
   */
  originalSuffix: string | undefined;

  indentationLevel: number | undefined;
  hasTrailingSeparator: boolean | undefined;
  isNodeRegionStart: boolean;
  isNodeRegionEnd: boolean;
};

/**
 * Returns a new NodeTrivia object that contains the properties of both the
 * trivia and overlay objects.
 *
 * @param trivia - The original NodeTrivia object.
 * @param overlay - A partial NodeTrivia object that contains properties to
 * overlay on top of the original object.
 *
 * @returns {NodeTrivia & {isOverlay: boolean | undefined}} A new NodeTrivia
 * object.
 */
function getTriviaWithOverlay(
  trivia: NodeTrivia,
  overlay: Partial<NodeTrivia>
): NodeTrivia & { isOverlay: boolean | undefined } {
  return {
    prefix: overlay.prefix ?? trivia.prefix,
    suffix: overlay.suffix ?? trivia.suffix,
    originalSuffix: overlay.originalSuffix ?? trivia.originalSuffix,
    indentationLevel: overlay.indentationLevel ?? trivia.indentationLevel,
    hasTrailingSeparator:
      overlay.hasTrailingSeparator ?? trivia.hasTrailingSeparator,
    isNodeRegionStart: overlay.isNodeRegionStart ?? trivia.isNodeRegionStart,
    isNodeRegionEnd: overlay.isNodeRegionEnd ?? trivia.isNodeRegionEnd,
    isOverlay: true,
  };
}

export class TriviaManager {
  private triviaByNode = new Map<ts.Node, NodeTrivia>();

  private overlays = new Map<ts.Node, Partial<NodeTrivia>>();

  /**
   * Sets the node trivia for a given node.
   *
   * @param node - The node to set the trivia for.
   * @param nodeTrivia - The node trivia to set.
   */
  set(node: ts.Node, nodeTrivia: NodeTrivia) {
    this.triviaByNode.set(node, nodeTrivia);
  }

  /**
   * Adds an overlay to the given node.
   *
   * @param node - The node to add the overlay to.
   * @param newOverlayTrivia - The overlay to add.
   */
  addOverlay(node: ts.Node, newOverlayTrivia: Partial<NodeTrivia>) {
    if (!this.overlays.has(node)) {
      this.overlays.set(node, {});
    }

    const overlayTrivia = this.overlays.get(node)!;

    // can enhance an overlay multiple times:
    overlayTrivia.prefix = newOverlayTrivia.prefix ?? overlayTrivia.prefix;
    overlayTrivia.suffix = newOverlayTrivia.suffix ?? overlayTrivia.suffix;
    overlayTrivia.indentationLevel =
      newOverlayTrivia.indentationLevel ?? overlayTrivia.indentationLevel;
    overlayTrivia.hasTrailingSeparator =
      newOverlayTrivia.hasTrailingSeparator ??
      overlayTrivia.hasTrailingSeparator;
    overlayTrivia.isNodeRegionStart =
      newOverlayTrivia.isNodeRegionStart ?? overlayTrivia.isNodeRegionStart;
    overlayTrivia.isNodeRegionEnd =
      newOverlayTrivia.isNodeRegionEnd ?? overlayTrivia.isNodeRegionEnd;
  }

  get(node: ts.Node | undefined): NodeTrivia | undefined {
    if (node === undefined) {
      return undefined;
    }

    if (!this.overlays.has(node)) {
      return this.triviaByNode.get(node);
    }

    const original = this.triviaByNode.get(node) ?? {
      prefix: "",
      suffix: "",
      originalSuffix: "",
      indentationLevel: 0,
      hasTrailingSeparator: true,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
    };

    return getTriviaWithOverlay(original, this.overlays.get(node)!);
  }

  getWithOriginal(
    node: ts.Node,
    original: ts.Node | undefined
  ): (NodeTrivia & { isOverlay?: boolean | undefined }) | undefined {
    if (original == null) {
      return this.get(node);
    }

    const originalTrivia = this.get(original);

    if (originalTrivia == null) {
      return this.get(node);
    }

    const overlay = this.overlays.get(node);

    return overlay == null
      ? originalTrivia
      : getTriviaWithOverlay(originalTrivia, overlay);
  }

  log() {
    // eslint-disable-next-line no-console
    console.log(
      `TriviaManager\n  Trivia:\n${Array.from(this.triviaByNode.entries())
        .map((entry) => `${getId(entry[0])}: ${JSON.stringify(entry[1])}`)
        .join("\n")}\n  Overlays:\n${Array.from(this.overlays.entries())
        .map((entry) => `${getId(entry[0])}: ${JSON.stringify(entry[1])}`)
        .join("\n")}`
    );

    return;
  }
}
