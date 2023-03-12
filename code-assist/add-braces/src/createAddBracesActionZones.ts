import { CodeAssistLevel, createActionZones, Range } from "@p42/engine";
import ts from "typescript";
import { AddBracesMatch, AddBracesType } from "./AddBracesMatch";

export function createAddBracesActionZones(
  match: AddBracesMatch,
  type: AddBracesType,
  statement: ts.Statement,
  provideQuickFix = true
) {
  return createActionZones(
    `Add {…} to ${type.label}`,
    [
      {
        range:
          type.regularRange ?? new Range(match.node.getStart(), statement.end),
        level: provideQuickFix
          ? CodeAssistLevel.QuickFix
          : CodeAssistLevel.Regular,
      },
    ],
    type.codeActionKindIndex
  );
}
