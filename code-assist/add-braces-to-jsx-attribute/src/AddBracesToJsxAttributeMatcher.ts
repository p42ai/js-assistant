import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { AddBracesToJsxAttributeCandidate } from "./AddBracesToJsxAttributeCandidate";

const { ast } = m;

export class AddBracesToJsxAttributeMatcher extends PatternMatcher<AddBracesToJsxAttributeCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.JsxAttribute],
  };

  createPattern() {
    const captures = {
      value: capture.node<ts.StringLiteral>(),
    };

    return {
      match: ast.jsxAttribute({
        initializer: captures.value.record({
          match: ast.stringLiteral(),
        }),
      }),
      captures,
    };
  }
}
