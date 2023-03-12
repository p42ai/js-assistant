
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { MoveStatementMatch } from "./MoveStatementMatch";

const { ast } = m;

export class MoveStatementMatcher extends PatternMatcher<MoveStatementMatch> {
  constructor() {
    super(MoveStatementMatch);
  }

  createPattern() {
    const captures = {
      selectedChildren: capture.value<Array<ts.Statement>>(),
    };

    return {
      match: ast.blockLike({
        statements: m.captureSelectedNodes({
          capture: captures.selectedChildren,
          selectionType: "partial",
        }),
      }),
      captures,
    };
  }
}
