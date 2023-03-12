
import { matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { FlipOperatorCandidate } from "./FlipOperatorCandidate";
import { flippableOperators } from "./FlipOperatorMapping";

const { ast } = m;

export class FlipOperatorMatcher extends PatternMatcher<FlipOperatorCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.BinaryExpression],
  };

  createPattern() {
    const captures = {};

    return {
      match: ast.binaryExpression({
        operator: flippableOperators,
      }),
      captures,
    };
  }
}
