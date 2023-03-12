import ts from "typescript";
import { getLeadingWhitespace } from "./getLeadingWhitespace";

export function getBaseIndentation(node: ts.Node): number {
  const sourceFile = node.getSourceFile();
  const lineStarts = sourceFile.getLineStarts();
  const start = node.getStart();

  let lineNumber = 0;
  while (lineNumber < lineStarts.length && lineStarts[lineNumber] <= start) {
    lineNumber++;
  }
  lineNumber -= 1; // go to the line start

  if (lineNumber >= 0) {
    const line = sourceFile
      .getFullText()
      .substring(lineStarts[lineNumber], lineStarts[lineNumber + 1]);
    return getLeadingWhitespace(line).length;
  }

  return 0;
}
