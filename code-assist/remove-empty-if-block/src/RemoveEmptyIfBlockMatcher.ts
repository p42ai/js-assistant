
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { RemoveEmptyIfBlockCandidate } from "./RemoveEmptyIfBlockCandidate";

const { ast } = m;

export class RemoveEmptyIfBlockMatcher extends PatternMatcher<RemoveEmptyIfBlockCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  createPattern() {
    const captures = {
      thenBlock: capture.node<ts.Block>(),
    };

    return {
      match: ast.ifStatement({
        thenStatement: captures.thenBlock.record({
          match: ast.emptyBlock(),
        }),
      }),
      captures,
    };
  }
}
