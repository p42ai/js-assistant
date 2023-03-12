import ts from "typescript";
import { TransformedNodeTree } from "../transformation/TransformedNodeTree.generated";
import { unescapeChar } from "../util/text/escapeChar";
import { isSingleQuote } from "./isSingleQuote";

/**
 * Returns the raw text that the user operator on (e.g. for text selections).
 *
 * For string literals, retrieves the original raw text of a string literal (from source) to
 * preserve escape sequences.
 *
 * For template elements, returns rawText when possible and text otherwise.
 *
 * @param tree
 *        If supplied, escaping the quote characters is attempted.
 */
export const getRawText = (
  node:
    | ts.StringLiteral
    | ts.NoSubstitutionTemplateLiteral
    | ts.TemplateHead
    | ts.TemplateMiddle
    | ts.TemplateTail,
  tree?: TransformedNodeTree | undefined
): string => {
  if (ts.isStringLiteral(node)) {
    const text = node.getText(); // get actual characters from original source
    const textWithoutQuotes = text.substring(1, text.length - 1); // remove quotes

    if (tree == null) {
      return textWithoutQuotes;
    }

    const singleQuote = isSingleQuote(node, tree);
    return unescapeChar(singleQuote ? "'" : '"', textWithoutQuotes);
  }

  // use rawText when available - in cases where it is not available (i.e. on
  // newly created nodes, it is assumed that text is correctly escaped for printing):
  return node.rawText ?? node.text;
};
