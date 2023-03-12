
import {
  BLOCK_LIKE_SYNTAX_KINDS,
  capture,
  matchers as m,
  PatternMatcher,
} from "@p42/engine";
import ts from "typescript";
import { SurroundWithIfStatementMatch } from "./SurroundWithIfStatementMatch";

const { ast } = m;

export class SurroundWithIfStatementMatcher extends PatternMatcher<SurroundWithIfStatementMatch> {
  candidates = {
    nodes: BLOCK_LIKE_SYNTAX_KINDS,
  };

  createPattern() {
    const captures = {
      selectedStatements: capture.value<Array<ts.Statement>>(),
    };

    return {
      match: ast.blockLike({
        statements: m.captureSelectedNodes({
          capture: captures.selectedStatements,
          selectionType: "full",
        }),
      }),
      captures,
    };
  }
}
