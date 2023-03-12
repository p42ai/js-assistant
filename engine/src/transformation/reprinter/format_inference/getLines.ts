import ts from "typescript";

export function getLines(sourceFile: ts.SourceFile) {
  const text = sourceFile.getFullText();
  const lineStarts = sourceFile.getLineStarts();

  return lineStarts.map((lineStart, index) =>
    text.substring(
      lineStart,
      index < lineStarts.length - 1 ? lineStarts[index + 1] - 1 : text.length
    )
  );
}
