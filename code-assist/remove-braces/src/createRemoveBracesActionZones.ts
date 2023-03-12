
import { CodeAssistLevel, createActionZones, Range } from "@p42/engine";
import ts from "typescript";
import { RemoveBracesMatch, RemoveBracesType } from "./RemoveBracesMatch";

export function createRemoveBracesActionZones(
  match: RemoveBracesMatch,
  type: RemoveBracesType,
  block: ts.Block
) {
  return createActionZones(
    `Remove {…} from ${type.label}`,
    [
      {
        range:
          type.getRegularRange?.(match) ??
          new Range(match.node.getStart(), block.end),
        level: CodeAssistLevel.QuickFix,
      },
    ],
    type.codeActionKindIndex
  );
}
