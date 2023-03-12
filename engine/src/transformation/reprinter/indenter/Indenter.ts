import { getLeadingWhitespace } from "../format_inference/getLeadingWhitespace";
import { PrintSettings } from "../PrintSettings";
import { findLinesThatStartInTemplate } from "./findLinesThatStartInTemplate";

export class Indenter {
  readonly #printSettings: PrintSettings;

  constructor(printSettings: PrintSettings) {
    this.#printSettings = printSettings;
  }

  private get lineBreak() {
    return this.#printSettings.lineBreak;
  }

  private split(text: string): Array<string> {
    return text.split(this.lineBreak);
  }

  private join(lines: Array<string>): string {
    return lines.join(this.lineBreak);
  }

  /**
   * Re-indents the lines with a new indentation unit keeping their original relative indent.
   *
   * @param lines
   *        Texts of the individual lines (excluding line breaks)
   * @param isLineStartInTemplate
   *        Flag if a line start is inside a template. Indices match `lines`.
   * @param targetIndentationLevel
   *        Base indentation level for the lines that will be returned. Relative indentation is applied in addition.
   *
   * @returns Re-indented lines using the indent of this Indenter.
   */
  reIndentLines(
    lines: string[],
    isLineStartInTemplate: boolean[],
    targetIndentationLevel: number
  ): string[] {
    if (lines.length !== isLineStartInTemplate.length) {
      throw new Error("isLineStartInTemplate length must match lines length.");
    }

    const existingLeadingWhitespace = lines.map(getLeadingWhitespace);
    const { singleIndentation } = this.#printSettings;
    const indentationCharactersPerLevel = singleIndentation.length;

    const indentationLevels = existingLeadingWhitespace.map((whitespace) =>
      Math.floor(whitespace.length / indentationCharactersPerLevel)
    );

    const isWhitespaceLine = lines.map((line) => line.trim() === "");

    const minIndentationLevel = Math.min(
      ...indentationLevels.filter(
        // exclude all whitespace-only lines from min indentation level calculation:
        (value, index) => !isWhitespaceLine[index]
      )
    );

    return lines.map((line, index) => {
      if (isLineStartInTemplate[index]) {
        return line;
      }

      const text = line.substring(existingLeadingWhitespace[index].length);

      if (isWhitespaceLine[index]) {
        // re-indent the last whitespace line that could be the prefix of what comes after:
        return index === lines.length - 1
          ? singleIndentation.repeat(targetIndentationLevel)
          : line;
      }

      const relativeIndentationLevel =
        indentationLevels[index] - minIndentationLevel;

      const remainderWhitespace = existingLeadingWhitespace[index].substring(
        indentationLevels[index] * indentationCharactersPerLevel
      );

      const indentationWhitespace = singleIndentation.repeat(
        targetIndentationLevel + relativeIndentationLevel
      );

      return indentationWhitespace + remainderWhitespace + text;
    });
  }

  /**
   * Updates the indentation of the 2nd and following lines.
   *
   * Assumptions:
   * - The first line is inline and needs no re-indentation. The whitespace from the first line
   *   is meaningless.
   * - The first line does not start inside a template, string, or multi-line comment.
   * - The text represents a node and it's surroundings (whitespace, comments, separators). It never
   *   represents a partial node.
   */
  reIndentReplacementText(
    text: string,
    targetIndentationLevel: number,
    startsInTemplate: boolean
  ): string {
    const lines = this.split(text);

    // no re-indentation for a single line
    if (lines.length === 1) {
      return text;
    }

    const adjustedLines = this.reIndentLines(
      lines.slice(1), // first line is not re-indented
      findLinesThatStartInTemplate(startsInTemplate, lines).slice(1),
      targetIndentationLevel
    );

    adjustedLines.unshift(lines[0]);
    return this.join(adjustedLines);
  }
}
