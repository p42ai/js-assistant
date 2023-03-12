import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { AddNumericSeparatorCandidate } from "./AddNumericSeparatorCandidate";

function addSeparators(originalText: string, blockWidth: number): string {
  let textWithSeparators = "";
  for (let i = 0; i < originalText.length; i++) {
    textWithSeparators += originalText.charAt(i);

    const remainingChars = originalText.length - i - 1;
    if (remainingChars % blockWidth === 0 && remainingChars > 0) {
      textWithSeparators += "_";
    }
  }
  return textWithSeparators;
}

function addSeparator(originalText: string) {
  if (originalText.startsWith("0x")) {
    return `0x${addSeparators(originalText.substring(2), 2)}`;
  }

  if (originalText.startsWith("0b")) {
    return `0b${addSeparators(originalText.substring(2), 4)}`;
  }

  if (originalText.startsWith("0o")) {
    return `0o${addSeparators(originalText.substring(2), 1)}`;
  }

  if (originalText.includes(".")) {
    const [integerPart, decimalPart] = originalText.split(".");
    return `${addSeparators(integerPart, 3)}.${decimalPart}`;
  }

  return addSeparators(originalText, 3);
}

export class AddNumericSeparatorTransformation extends Transformation<AddNumericSeparatorCandidate> {
  async apply(match: AddNumericSeparatorCandidate, tree: TransformedNodeTree) {
    // TODO automatic refactoring: push destructuring into parameter
    const { node } = match;

    // Use .getText() instead of .text to get raw text (incl. .00)
    const originalText = node.getText();

    tree.replace(
      node,
      ts.isNumericLiteral(node)
        ? tree.updateNumericLiteral(node, {
            text: addSeparator(originalText),
          })
        : tree.updateBigIntLiteral(node, {
            text: `${addSeparator(
              originalText.substring(0, originalText.length - 1)
            )}n`,
          })
    );
  }

  analyzeSafety(match: AddNumericSeparatorCandidate) {
    return Safety.safe();
  }

  getSuggestion(
    match: AddNumericSeparatorCandidate,
    safety: Safety
  ): Suggestion | null {
    if (match.data.type === "decimal" && match.data.nonDecimalLength < 5) {
      return null;
    }

    const numberName = ts.isBigIntLiteral(match.node) ? "bigint" : "number";

    return {
      description: `You can add numeric separators to the ${
        match.data.type
      } ${numberName} '${match.node.getText()}'.`,
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: AddNumericSeparatorCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Add numeric separator", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
