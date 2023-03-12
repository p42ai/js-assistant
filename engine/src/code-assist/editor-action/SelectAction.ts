import ts from "typescript";
import { resolveNodePath } from "../../ast/NodePath";
import { SelectOperation } from "../../transformation/editor-operation";
import { Range } from "../../util/text/Range";

export type SelectAction = {
  type: "SELECT";
  selections: Array<Range>;
};

export function createSelectAction(
  operation: SelectOperation,
  sourceFile: ts.SourceFile,
  offset: number
): SelectAction | undefined {
  const resolvedSelectionRanges: Array<Range> = [];

  for (const { offset: selectionOffset, nodePath } of operation.selections) {
    const node = resolveNodePath(nodePath, sourceFile);

    if (node == null) {
      continue;
    }

    const start = node.getStart(sourceFile);
    const end = node.getEnd();

    const nodeRangeStart = sourceFile.getLineAndCharacterOfPosition(start);
    const nodeRangeEnd = sourceFile.getLineAndCharacterOfPosition(end);

    let startPosition: number;
    let endPosition: number | undefined = undefined;

    if (selectionOffset != null) {
      startPosition = start + selectionOffset.start;
      endPosition = start + selectionOffset.end;
    } else if (
      ts.isBlock(node) &&
      node.statements.length === 0 &&
      nodeRangeEnd.line - nodeRangeStart.line >= 2
    ) {
      // empty block with internal line: place at end of internal line
      const lineStarts = sourceFile.getLineStarts();
      const innerLine = nodeRangeStart.line + 1;

      // -1 to account for \n TODO what about \cr\n ?
      const lineLength =
        lineStarts[nodeRangeStart.line + 2] - lineStarts[innerLine] - 1;

      startPosition = sourceFile.getPositionOfLineAndCharacter(
        innerLine,
        lineLength
      );
    } else {
      startPosition = start;
    }

    resolvedSelectionRanges.push(
      new Range(offset + startPosition, offset + (endPosition ?? startPosition))
    );
  }

  return resolvedSelectionRanges.length !== 0
    ? {
        type: "SELECT",
        selections: resolvedSelectionRanges,
      }
    : undefined;
}
