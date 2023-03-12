import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { ConvertDotNotationPropertyAccessToBracketNotationCandidate } from "./ConvertDotNotationPropertyAccessToBracketNotationCandidate";

const { ast } = m;

export class ConvertDotNotationPropertyAccessToBracketNotationMatcher extends PatternMatcher<ConvertDotNotationPropertyAccessToBracketNotationCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.PropertyAccessExpression],
  };

  createPattern() {
    const captures = {
      name: capture.value<string>(),
    };

    return {
      match: ast.propertyAccessExpression({
        name: ast.identifier({
          text: captures.name.record(),
        }),
      }),
      captures,
    };
  }
}
