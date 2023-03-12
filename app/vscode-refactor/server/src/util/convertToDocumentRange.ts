import * as p42 from "@p42/engine";
import { Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

export function convertToDocumentRange(
  range: p42.Range,
  document: TextDocument
): Range {
  return {
    start: document.positionAt(range.start),
    end: document.positionAt(range.end),
  };
}
