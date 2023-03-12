import * as vscode from "vscode";
import * as p42 from "@p42/engine";

// TODO return cancellation token
export const animateRanges = ({
  ranges,
  decorations,
  textEditor,
  frameMs,
}: {
  ranges: Array<vscode.Range>;
  decorations: Array<vscode.TextEditorDecorationType>;
  textEditor: vscode.TextEditor;
  frameMs: number;
}) => {
  let previousIndex: number | undefined = undefined;
  let currentIndex = 0;

  const executeStep = () => {
    if (currentIndex < decorations.length) {
      textEditor.setDecorations(decorations[currentIndex], ranges);
    }
    if (previousIndex != null) {
      textEditor.setDecorations(decorations[previousIndex], []);
    }

    if (currentIndex >= decorations.length) {
      return;
    }

    previousIndex = currentIndex;
    currentIndex++;

    p42.sleep(frameMs).then(() => {
      try {
        executeStep();
      } catch (error) {
        // ignore (e.g. when editor is closed)
      }
    });
  };

  try {
    executeStep();
  } catch (error) {
    // ignore (e.g. when editor is closed)
  }
};
