
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { MoveObjectPropertyMatch } from "./MoveObjectPropertyMatch";

const { ast } = m;

export class MoveObjectPropertyMatcher extends PatternMatcher<MoveObjectPropertyMatch> {
  constructor() {
    super(MoveObjectPropertyMatch);
  }

  createPattern() {
    const captures = {
      selectedChildren: capture.value<Array<ts.ObjectLiteralElementLike>>(),
    };

    return {
      match: ast.objectLiteralExpression({
        properties: m.captureSelectedNodes({
          capture: captures.selectedChildren,
          selectionType: "partial",
        }),
      }),
      captures,
    };
  }
}
