
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { MoveArrayElementMatch } from "./MoveArrayElementMatch";

const { ast } = m;

export class MoveArrayElementMatcher extends PatternMatcher<MoveArrayElementMatch> {
  constructor() {
    super(MoveArrayElementMatch);
  }

  createPattern() {
    const captures = {
      selectedChildren: capture.value<Array<ts.Expression>>(),
    };

    return {
      match: ast.arrayLiteralExpression({
        elements: m.captureSelectedNodes({
          capture: captures.selectedChildren,
          selectionType: "partial",
        }),
      }),
      captures,
    };
  }
}
