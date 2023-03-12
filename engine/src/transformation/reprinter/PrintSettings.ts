import { NewlineSeparator, StandardSeparator } from "./Separator";

export class PrintSettings {
  /**
   * Line break characters.
   */
  readonly lineBreak: "\r\n" | "\n";

  /**
   * Characters for a single indentation level, e.g. one tab or 4 spaces.
   */
  readonly singleIndentation: string;

  /**
   * Quote settings for string literals.
   */
  readonly isSingleQuoteDefault = false;

  readonly newlineSeparator;

  readonly commaNewlineSeparator;

  readonly emptySeparator = new StandardSeparator("");

  readonly commaSpaceSeparator = new StandardSeparator(", ");

  readonly spaceSeparator = new StandardSeparator(" ", false, " ");

  readonly ampersandSeparator = new StandardSeparator(" & ", true);

  readonly barSeparator = new StandardSeparator(" | ", true);

  constructor(
    {
      singleIndentation = "  ",
      lineBreak = "\n",
    }: {
      singleIndentation?: string;
      lineBreak?: "\r\n" | "\n";
    } = {
      singleIndentation: "  ",
      lineBreak: "\n",
    }
  ) {
    this.singleIndentation = singleIndentation;
    this.lineBreak = lineBreak;

    this.newlineSeparator = new NewlineSeparator(lineBreak, singleIndentation);
    this.commaNewlineSeparator = new NewlineSeparator(
      lineBreak,
      singleIndentation,
      ","
    );
  }
}
