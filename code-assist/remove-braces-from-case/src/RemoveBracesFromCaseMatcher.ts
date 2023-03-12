
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { RemoveBracesFromCaseMatch } from "./RemoveBracesFromCaseMatch";

const { ast } = m;

export class RemoveBracesFromCaseMatcher extends PatternMatcher<RemoveBracesFromCaseMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.CaseClause],
  };

  constructor() {
    super(RemoveBracesFromCaseMatch);
  }

  createPattern() {
    const captures = {
      block: capture.node<ts.Block>(),
    };

    return {
      match: ast.caseClause({
        statements: p.array(
          ast.block({
            constraints: [captures.block.record()],
          })
        ),
      }),
      captures,
    };
  }
}
