import * as p42 from "@p42/engine";
import * as vscode from "vscode";
import { convertOffsetRangesToVscodeRanges } from "../../util/text/convertOffsetRangeToVscodeRange";
import { EditorActionExecutor } from "./EditorActionExecutor";

export class SelectExecutor extends EditorActionExecutor<p42.SelectAction> {
  constructor() {
    super("SELECT");
  }

  async execute(
    textEditor: vscode.TextEditor,
    action: p42.SelectAction
  ): Promise<void> {
    const selections = convertOffsetRangesToVscodeRanges(
      action.selections,
      textEditor.document
    ).map((range) => new vscode.Selection(range.start, range.end));

    if (selections.length === 0) {
      return;
    }

    textEditor.selections = selections;

    // ensure that the first selection remains visible:
    textEditor.revealRange(selections[0]);
  }
}
