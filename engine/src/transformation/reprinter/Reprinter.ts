import ts from "typescript";
import { getId } from "../../ast/getId";
import { getSyntaxKindLabel } from "../../ast/getSyntaxKindLabel";
import { KEYWORDS } from "../../ast/Keywords";
import { TOKENS } from "../../ast/Tokens";
import { Range } from "../../util/text/Range";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";
import { Edit } from "./Edit";
import { getBaseIndentation } from "./format_inference/getBaseIndentation";
import { inferPrintSettings } from "./format_inference/inferPrintSettings";
import { gatherTrivia } from "./gatherTrivia";
import { getNodeEndIncludingTrailingComments } from "./getNodeEndIncludingTrailingComments";
import { Indenter } from "./indenter/Indenter";
import { minimizeEdit } from "./minimizeEdit";
import { PrintSettings } from "./PrintSettings";
import { ReprintBlueprints } from "./ReprintBlueprints";
import { ReprintContext } from "./ReprintContext";
import { ReprintTemplate } from "./ReprintTemplate";

export class Reprinter {
  #templates = new Map<ts.SyntaxKind, ReprintTemplate>();
  #printSettings: PrintSettings;
  #indenter: Indenter;

  constructor(originalSource: ts.SourceFile) {
    this.#printSettings = inferPrintSettings(originalSource);
    this.#indenter = new Indenter(this.#printSettings);
    this.#templates = ReprintBlueprints.createReprintTemplates(
      this.#printSettings
    );
  }

  reprintNodeArray(
    separator: string,
    nodes: ts.NodeArray<ts.Node>,
    context: ReprintContext
  ): string {
    return nodes.map((node) => this.reprintNode(node, context)).join(separator);
  }

  reprintNode(node: ts.Node | undefined, context: ReprintContext): string {
    // empty child: return empty string
    if (node == null) {
      return "";
    }

    // original node: get original text and re-indent it to the current level
    // if the node was moved and it's not just a simple single-node swap of it's parent
    //
    // note: the full text (which includes preceding whitespace) is not retrieved,
    // because inner whitespace and comments are handled separately
    if (context.isOriginal(node) || context.isCopied(node)) {
      let text = context.getOriginalOrCopiedText(node);

      // When there is a trailing comment that is not available in the node trivia,
      // because it is associated with a child node, and would thus be dropped,
      // reprint it:
      const nodeTrivia = context.trivia.get(context.getOriginalNode(node));
      if (nodeTrivia?.originalSuffix !== nodeTrivia?.suffix) {
        text += nodeTrivia?.originalSuffix ?? "";
      }

      // if the node has been copied or truly moved, re-indent it:
      return context.isCopied(node) ||
        (context.hasBeenMoved(node) && context.hasTrulyBeenMoved(node))
        ? context.reIndent(context.addParenthesesIfNeeded(text, node), node)
        : text;
    }

    const { kind } = node;

    // basic tokens and keywords: convert to string
    if (TOKENS.includes(kind) || KEYWORDS.includes(kind)) {
      return ts.tokenToString(kind)!;
    }

    if (this.#templates.has(kind)) {
      try {
        const text = this.#templates.get(kind)!.reprint(node, context);

        // need to re-indent if node is moved, modified and root of moved subtree:
        const newParent = context.getParent(node);
        if (
          context.hasBeenMoved(node) &&
          context.isModified(node) &&
          context.hasTrulyBeenMoved(node) &&
          newParent != null &&
          !context.hasBeenMoved(newParent)
        ) {
          return context.reIndent(text, node);
        }

        return text;
      } catch (error: any) {
        throw new Error(
          `reprint: failed to reprint ${getSyntaxKindLabel(kind)} > ${
            error.message ?? error
          } ${getId(context.getOriginalNode(node) ?? node)}`
        );
      }
    }

    throw `reprint: unsupported node type ${getSyntaxKindLabel(kind)}`;
  }

  createReplacementEdit(tree: TransformedNodeTree): Edit | undefined {
    if (tree.modificationRoot == null) {
      return undefined;
    }

    const originalNode = tree.getOriginalNode(tree.modificationRoot)!;
    const originalFullText = originalNode.getSourceFile().getFullText();
    const fullStart = originalNode.getFullStart();
    const start = originalNode.getStart();
    const end = getNodeEndIncludingTrailingComments(
      originalNode,
      originalFullText
    );

    const baseIndentationLevel =
      getBaseIndentation(originalNode) /
      this.#printSettings.singleIndentation.length;

    const trivia = gatherTrivia({
      tree,
      templates: this.#templates,
      printSettings: this.#printSettings,
    })!;

    const context = new ReprintContext(
      tree,
      this,
      baseIndentationLevel,
      this.#indenter,
      start,
      trivia
    );

    // outmost node prefix (e.g. leading comment):
    // note: the special treatment of the first comment in a source file might seem
    // strange. However, it is actually practical, since the first comment in a source
    // file is often a copyright header, and it would be annoying to move nodes on
    // top of it.
    let replacementText = originalFullText.substring(start, fullStart);

    // actual content replacement:
    replacementText += this.reprintNode(tree.modificationRoot, context);

    // add suffix including overlay
    replacementText +=
      trivia.get(tree.modificationRoot)?.suffix?.trimRight() ?? "";

    return minimizeEdit(
      new Edit(new Range(fullStart, end), replacementText),
      originalFullText
    );
  }
}
