
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { MoveJsxAttributeMatch } from "./MoveJsxAttributeMatch";

const { ast } = m;

export class MoveJsxAttributeMatcher extends PatternMatcher<MoveJsxAttributeMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.JsxAttribute],
  };

  constructor() {
    super(MoveJsxAttributeMatch);
  }

  createPattern() {
    const captures = {
      selectedChildren: capture.value<Array<ts.JsxAttribute>>(),
    };

    return {
      match: ast.jsxAttributes({
        properties: m.captureSelectedNodes({
          capture: captures.selectedChildren,
          selectionType: "partial",
        }),
      }),
      captures,
    };
  }
}
