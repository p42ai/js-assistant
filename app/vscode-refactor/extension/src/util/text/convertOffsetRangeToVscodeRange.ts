import * as p42 from "@p42/engine";
import * as vscode from "vscode";

export const convertOffsetRangeToVscodeRange = (
  range: p42.Range,
  document: vscode.TextDocument
) =>
  new vscode.Range(
    document.positionAt(range.start),
    document.positionAt(range.end)
  );

export const convertOffsetRangesToVscodeRanges = (
  ranges: Array<p42.Range>,
  document: vscode.TextDocument
) =>
  ranges.map(
    (range) =>
      new vscode.Range(
        document.positionAt(range.start),
        document.positionAt(range.end)
      )
  );
