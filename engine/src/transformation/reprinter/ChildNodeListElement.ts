import ts from "typescript";
import { ChildIterationContext } from "./ChildIterationContext";
import { Element } from "./Element";
import { ExtractionContext } from "./ExtractionContext";
import { findSeparatorIndexOutsideOfComment } from "./findSeparatorIndexOutsideOfComment";
import { getNodeEndIncludingTrailingComments } from "./getNodeEndIncludingTrailingComments";
import { ReprintContext } from "./ReprintContext";
import { Separator } from "./Separator";
import { TriviaGatheringContext } from "./TriviaGatheringContext";

const containsInnerWhitespaceLine = (
  text: string,
  separator: Separator
): boolean => {
  if (!separator.hasNewline) {
    return false;
  }

  const lines = text.split(separator.minimalSeparator);

  return (
    lines.length >= 3 &&
    lines.some(
      (line, index) =>
        index !== 0 && index !== lines.length - 1 && line.trim() === ""
    )
  );
};

export class ChildNodeListElement implements Element {
  private readonly property: string;
  private readonly defaultSeparator: Separator;
  private readonly supportsTrailingSeparator: boolean;

  constructor(
    property: string,
    defaultSeparator: Separator,
    supportsTrailingSeparator: boolean
  ) {
    this.property = property;
    this.defaultSeparator = defaultSeparator;
    this.supportsTrailingSeparator = supportsTrailingSeparator;
  }

  private getChildrenForProperty(node: ts.Node) {
    return ((node as any)[this.property] ?? []) as ts.NodeArray<ts.Node>;
  }

  private getNodeText(
    node: ts.Node,
    previousNode: ts.Node,
    isFirst: boolean,
    isLast: boolean,
    context: ReprintContext
  ): string {
    const originalNode = context.getOriginalNode(node);
    const nodeTrivia = context.trivia.getWithOriginal(node, originalNode);
    const hasTrivia = nodeTrivia != null;

    const originalPreviousNode = context.getOriginalNode(previousNode);
    const previousNodeTrivia = context.trivia.getWithOriginal(
      previousNode,
      originalPreviousNode
    );

    let prefix = "";

    // add node prefix:
    if (isFirst) {
      // left trim for first line to account for whitespace that was captured by
      // preceding newline element
      if (hasTrivia) {
        const { hasNewline } = this.defaultSeparator;
        if (!hasNewline) {
          // keep full prefix for templates (empty separator):
          prefix += this.defaultSeparator.isEmpty
            ? nodeTrivia!.prefix!
            : nodeTrivia!.prefix!.trimLeft();
        } else {
          // if we have a newline-separated list, trim only the first newline.
          const separator = this.defaultSeparator.minimalSeparator;
          const lines = nodeTrivia!.prefix!.split(separator);
          const firstLineTrim = lines[0].trimLeft();

          prefix +=
            lines.length > 1
              ? `${firstLineTrim}${separator}${lines.slice(1).join(separator)}`
              : firstLineTrim;
        }
      }
    } else {
      // insert additional separator if the previous node indicates a node range start, but this
      // node does not (e.g., because it's new or moved)
      if (
        this.defaultSeparator.hasNewline &&
        previousNodeTrivia?.isNodeRegionEnd &&
        !nodeTrivia?.isNodeRegionStart
      ) {
        prefix += this.defaultSeparator.minimalSeparator;
      }

      if (!hasTrivia) {
        // for new nodes or after new nodes, additional default whitespace might be needed
        // when inserting in the middle:
        prefix += this.defaultSeparator.emit(context);
      } else {
        const isInsertedAfterAnOriginalNode =
          !context.hasTrulyBeenMoved(previousNode) &&
          context.hasTrulyBeenMoved(node);

        // if node is new, or if previous node had trailing separator, or if previous node is new,
        // insert separator:
        if (isInsertedAfterAnOriginalNode) {
          prefix += this.defaultSeparator.emit(context);
        } else if (
          !hasTrivia ||
          previousNodeTrivia == null ||
          (previousNodeTrivia.hasTrailingSeparator ?? true) ||
          this.defaultSeparator.hasComma ||
          (context.hasTrulyBeenMoved(previousNode) &&
            !context.hasTrulyBeenMoved(node))
        ) {
          if (
            this.defaultSeparator.surroundWithSpace &&
            !prefix.endsWith(" ")
          ) {
            prefix += " ";
          }

          prefix +=
            previousNodeTrivia == null
              ? this.defaultSeparator.minimalSeparator2
              : this.defaultSeparator.minimalSeparator;
        }

        prefix +=
          isInsertedAfterAnOriginalNode && !nodeTrivia.isNodeRegionStart
            ? nodeTrivia.prefix?.trimLeft()
            : nodeTrivia.prefix;
      }
    }

    // add node suffix:
    let suffix = "";
    if (nodeTrivia?.suffix != null) {
      suffix += nodeTrivia?.suffix;

      if (!nodeTrivia?.hasTrailingSeparator || nodeTrivia.isOverlay) {
        suffix = suffix.trimRight();
      }

      // if there is a trailing comma for the last node, add it:
      if (
        isLast &&
        this.supportsTrailingSeparator &&
        (nodeTrivia.hasTrailingSeparator ?? false)
      ) {
        suffix += this.defaultSeparator.minimalSeparator;
      }
    }

    // because moved nodes get re-indented again, only re-indent to the parent
    // level (plus potential block indentation) when a subtree was moved.
    if (context.needsReindentation(node, nodeTrivia)) {
      let targetIndentation = context.indentationLevel;
      const parent = context.getParent(node)!;

      // when parent is original, align to parent indentation
      if (!context.isNew(parent!)) {
        const original = context.getOriginalNode(parent);
        const parentTrivia = context.trivia.get(original);

        if (parentTrivia?.indentationLevel != null) {
          targetIndentation =
            ts.isArrayLiteralExpression(parent) ||
            ts.isArrayBindingPattern(parent) ||
            ts.isBlock(parent) ||
            ts.isCaseBlock(parent) ||
            ts.isCaseClause(parent) ||
            ts.isClassDeclaration(parent) ||
            ts.isClassExpression(parent) ||
            ts.isDefaultClause(parent) ||
            ts.isInterfaceDeclaration(parent) ||
            ts.isModuleBlock(parent) ||
            ts.isObjectLiteralExpression(parent) ||
            ts.isObjectBindingPattern(parent) ||
            ts.isTypeLiteralNode(parent) ||
            ts.isVariableDeclarationList(parent)
              ? parentTrivia.indentationLevel + 1
              : parentTrivia.indentationLevel;
        }
      }

      prefix = context.reIndent(prefix, node, targetIndentation);
      suffix = context.reIndent(suffix, node, targetIndentation);
    }

    // note: node has already been re-indented
    return prefix + context.reprintNode(node) + suffix;
  }

  emit(node: ts.Node, context: ReprintContext): string {
    let text = "";

    const nodes = this.getChildrenForProperty(node);
    for (let i = 0; i < nodes.length; i++) {
      text += this.getNodeText(
        nodes[i],
        nodes[i - 1],
        i === 0,
        i === nodes.length - 1,
        context
      );
    }

    return text;
  }

  extract(context: ExtractionContext) {
    context.nextChildIndex++;
  }

  gatherTrivia(
    iterationContext: ChildIterationContext,
    triviaContext: TriviaGatheringContext
  ) {
    const nodes = (iterationContext.parent as any)[
      this.property
    ] as ts.NodeArray<ts.Node>;

    const separator = this.defaultSeparator.minimalSeparator;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      const isFirst = i === 0;
      const isLast = i === nodes.length - 1;

      // prefix has to start after parent start (otherwise the trivia should be captured on the parent)
      const potentialPrefixStart = Math.max(
        node.parent.getStart(),
        !isFirst
          ? nodes[i - 1].getEnd()
          : iterationContext.getPreviousChild()?.getEnd() ?? node.pos
      );

      const potentialPrefixEnd = node.getStart();
      const potentialPrefix = triviaContext.fullText.substring(
        potentialPrefixStart,
        potentialPrefixEnd
      );

      const prefixSeparatorIndex = findSeparatorIndexOutsideOfComment(
        potentialPrefix,
        separator
      );
      const prefixStart =
        prefixSeparatorIndex === -1
          ? potentialPrefixStart
          : potentialPrefixStart + prefixSeparatorIndex + separator.length;

      const potentialSuffixStart = node.getEnd();
      const potentialSuffixEnd = isLast
        ? iterationContext.getNextChild2()?.getStart() ??
          getNodeEndIncludingTrailingComments(node, triviaContext.fullText)
        : nodes[i + 1].getStart();

      // push trailing same-line suffix into last real child when possible:
      const lastChild = node.getChildAt(node.getChildCount() - 1);
      const isLastChildNode =
        lastChild != null &&
        (!ts.isToken(lastChild) || ts.isIdentifier(lastChild));

      const suffixStart = isLastChildNode
        ? getNodeEndIncludingTrailingComments(lastChild, triviaContext.fullText)
        : potentialSuffixStart;

      const originalSuffixStart =
        isLastChildNode && !triviaContext.tree.isOriginal(node)
          ? getNodeEndIncludingTrailingComments(
              lastChild,
              triviaContext.fullText
            )
          : potentialSuffixStart;

      const potentialSuffix = triviaContext.fullText.substring(
        suffixStart,
        potentialSuffixEnd
      );
      const suffixSeparatorIndex = findSeparatorIndexOutsideOfComment(
        potentialSuffix,
        separator
      );

      const suffixEnd =
        suffixSeparatorIndex === -1
          ? isLast
            ? potentialSuffixEnd
            : suffixStart // no suffix if no separator found
          : suffixStart + suffixSeparatorIndex;

      const hasTrailingSeparator = suffixSeparatorIndex !== -1;

      const isNodeRegionEnd =
        !isLast &&
        hasTrailingSeparator &&
        containsInnerWhitespaceLine(potentialSuffix, this.defaultSeparator);

      const isNodeRegionStart =
        !isFirst &&
        containsInnerWhitespaceLine(
          potentialPrefix.substring(prefixSeparatorIndex),
          this.defaultSeparator
        );

      // record trivia
      triviaContext.recordTrivia(
        node,
        {
          pos: prefixStart,
          end: node.getStart(),
        },
        {
          pos: suffixStart,
          end: suffixEnd,
        },
        {
          pos: originalSuffixStart,
          end: suffixEnd,
        },
        hasTrailingSeparator,
        isNodeRegionStart,
        isNodeRegionEnd
      );

      // recursion
      triviaContext.gatherChildTrivia(node);
    }

    iterationContext.childIndex++;
  }
}
