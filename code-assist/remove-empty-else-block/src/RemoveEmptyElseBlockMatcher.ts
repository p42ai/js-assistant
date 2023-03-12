
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { RemoveEmptyElseBlockCandidate } from "./RemoveEmptyElseBlockCandidate";

const { ast } = m;

export class RemoveEmptyElseBlockMatcher extends PatternMatcher<RemoveEmptyElseBlockCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  createPattern() {
    const captures = {
      elseBlock: capture.node<ts.Block>(),
    };

    return {
      match: ast.ifStatement({
        elseStatement: captures.elseBlock.record({
          match: ast.emptyBlock(),
        }),
      }),
      captures,
    };
  }
}
