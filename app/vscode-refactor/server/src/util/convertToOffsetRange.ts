import * as p42 from "@p42/engine";
import { Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

export function convertToOffsetRange(
  range: Range,
  document: TextDocument
): p42.Range {
  return new p42.Range(
    document.offsetAt(range.start),
    document.offsetAt(range.end)
  );
}
