import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { RemoveBracesFromJsxAttributeCandidate } from "./RemoveBracesFromJsxAttributeCandidate";

const { ast } = m;

export class RemoveBracesFromJsxAttributeMatcher extends PatternMatcher<RemoveBracesFromJsxAttributeCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.JsxAttribute],
  };

  createPattern() {
    const captures = {
      value: capture.node<ts.StringLiteral>(),
    };

    return {
      match: ast.jsxAttribute({
        initializer: ast.jsxExpression({
          expression: captures.value.record({
            match: ast.stringLiteral(),
          }),
        }),
      }),
      captures,
    };
  }
}
