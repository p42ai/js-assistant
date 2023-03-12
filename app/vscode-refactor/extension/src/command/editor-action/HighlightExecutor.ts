import * as p42 from "@p42/engine";
import * as vscode from "vscode";
import { convertOffsetRangesToVscodeRanges } from "../../util/text/convertOffsetRangeToVscodeRange";
import { animateRanges } from "./animateRanges";
import { EditorActionExecutor } from "./EditorActionExecutor";

export class HighlightExecutor extends EditorActionExecutor<p42.HighlightAction> {
  private readonly decorations: Array<vscode.TextEditorDecorationType> = [];
  private readonly isCodeAssistAnimationEnabled: () => boolean;

  constructor({
    isCodeAssistAnimationEnabled,
  }: {
    isCodeAssistAnimationEnabled: () => boolean;
  }) {
    super("HIGHLIGHT");

    this.isCodeAssistAnimationEnabled = isCodeAssistAnimationEnabled;

    for (let i = 33; i >= 0; i--) {
      this.decorations.push(
        vscode.window.createTextEditorDecorationType({
          backgroundColor: `rgb(45, 164, 78, ${i / 40})`, // 0.8 -> 0
        })
      );
    }
  }

  async execute(
    textEditor: vscode.TextEditor,
    action: p42.HighlightAction
  ): Promise<void> {
    if (!this.isCodeAssistAnimationEnabled()) {
      return;
    }

    const highlightRanges = convertOffsetRangesToVscodeRanges(
      action.highlights,
      textEditor.document
    );

    if (highlightRanges.length === 0) {
      return;
    }

    animateRanges({
      ranges: highlightRanges,
      decorations: this.decorations,
      frameMs: 15, // total 34 * 15 = 510ms
      textEditor,
    });
  }
}
