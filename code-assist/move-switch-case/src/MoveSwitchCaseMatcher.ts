
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { MoveSwitchCaseMatch } from "./MoveSwitchCaseMatch";

const { ast } = m;

export class MoveSwitchCaseMatcher extends PatternMatcher<MoveSwitchCaseMatch> {
  constructor() {
    super(MoveSwitchCaseMatch);
  }

  createPattern() {
    const captures = {
      selectedChildren: capture.value<Array<ts.CaseOrDefaultClause>>(),
    };

    return {
      match: ast.caseBlock({
        clauses: m.captureSelectedNodes({
          capture: captures.selectedChildren,
          selectionType: "partial",
        }),
      }),
      captures,
    };
  }
}
