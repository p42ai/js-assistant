import _ from "lodash";
import ts from "typescript";
import { PrintSettings } from "../PrintSettings";
import { createLeadingWhitespaceHistogram } from "./createLeadingWhitespaceHistogram";
import { getLines } from "./getLines";
import { inferLineBreak } from "./inferLineBreak";

export function inferPrintSettings(sourcefile: ts.SourceFile) {
  const histogram = createLeadingWhitespaceHistogram(getLines(sourcefile));
  const lineBreak = inferLineBreak(sourcefile);

  if (preferTabs(histogram)) {
    return new PrintSettings({
      singleIndentation: "\t",
      lineBreak,
    });
  }

  return new PrintSettings({
    singleIndentation: " ".repeat(inferSpaceCount(histogram)),
    lineBreak,
  });
}

function inferSpaceCount(whitespaceHistogram: Record<string, number>) {
  const spaceEntries = Object.entries(whitespaceHistogram)
    // filter to space entries
    .filter((entry) => entry[0].length > 0 && entry[0].charAt(0) === " ");

  const sum = _.sumBy(spaceEntries, (entry) => entry[1]);

  const spaceCounts = spaceEntries
    // filter out entries that account for less than 5% of lines
    .filter((entry) => entry[1] / sum > 0.05)
    // convert to counts of spaces (note: could contain other chars)
    .map((entry) => entry[0].length);

  // count the lines that do not have a 8 / 4 / 2 indentation
  const mismatched8 = _.sumBy(spaceCounts, (count) => Math.min(1, count % 8));
  const mismatched4 = _.sumBy(spaceCounts, (count) => Math.min(1, count % 4));
  const mismatched2 = _.sumBy(spaceCounts, (count) => Math.min(1, count % 2));

  if (mismatched2 === 0 && mismatched4 === 0 && mismatched8 === 0) {
    return 2;
  }

  if (mismatched8 === mismatched4 && mismatched8 === mismatched2) {
    return 8;
  }

  if (mismatched4 === mismatched2) {
    return 4;
  }

  return 2;
}

function preferTabs(whitespaceHistogram: Record<string, number>) {
  const keys = Object.keys(whitespaceHistogram)
    .filter((key) => key !== "")
    .map((key) => key.charAt(0));
  const counts = _.countBy(keys);

  const spaceCount = counts[" "] ?? 0;
  const tabsCount = counts["\t"] ?? 0;

  return tabsCount > 0 && tabsCount >= spaceCount;
}
