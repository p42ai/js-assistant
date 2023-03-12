import ts from "typescript";

export function inferLineBreak(sourceFile: ts.SourceFile): "\n" | "\r\n" {
  const text = sourceFile.getFullText();
  const lineStarts = sourceFile.getLineStarts();

  let carriageReturnCount = 0;
  const totalCount = lineStarts.length - 1;

  for (let i = 0; i < lineStarts.length - 1; i++) {
    const lineEnd = lineStarts[i + 1];

    // newline is always last char for both \n and \r\n separator:
    const charBeforeNewline = text.substring(lineEnd - 2, lineEnd - 1);
    if (charBeforeNewline === "\r") {
      carriageReturnCount++;
    }
  }

  // when more than 50% of lines use \r\n, return \r\n as separator
  return carriageReturnCount > totalCount / 2 ? "\r\n" : "\n";
}
