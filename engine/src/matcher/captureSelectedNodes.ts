import ts from "typescript";
import { getId } from "../ast/getId";
import * as NodeRange from "../ast/NodeRange";
import { ValueCapture } from "./capture/ValueCapture";
import { Context } from "./engine/Context";

export const captureSelectedNodes = <T extends ts.Node>({
  capture,
  selectionType,
}: {
  selectionType: "full" | "partial";
  capture: ValueCapture<Array<T>, Context>;
}) => {
  const recordSelectedNodes = capture.record();

  return <T extends ts.Node>(
    candidateNodes: ts.NodeArray<T>,
    context: Context
  ): boolean => {
    const range = context?.selectedRange;

    if (range == null) {
      return false;
    }

    const selectedNodes: T[] = [];
    for (const candidate of candidateNodes) {
      const candidateRange = NodeRange.node(candidate);

      switch (selectionType) {
        case "full": {
          if (range.containsRange(candidateRange)) {
            selectedNodes.push(candidate);
            continue;
          }

          // abort when there is at least 1 only partial match:
          if (
            range.start < candidateRange.end &&
            candidateRange.start < range.end
          ) {
            // note: if the range ends exactly on the candidate start, it is not counted
            // as a partial match to enabled multi-line selections (which end on the start
            // of the next node when there is no indentation)
            return false;
          }

          break;
        }
        case "partial": {
          if (range.overlapsWith(candidateRange)) {
            selectedNodes.push(candidate);
            continue;
          }

          break;
        }
        default:
          throw new Error(`unknown selectionType ${selectionType}`);
      }
    }

    if (selectedNodes.length === 0) {
      return false;
    }

    recordSelectedNodes(selectedNodes, context);

    return true;
  };
};
