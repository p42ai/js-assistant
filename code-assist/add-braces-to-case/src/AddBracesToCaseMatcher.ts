import { matchers as m, PatternMatcher, predicates as p } from "@p42/engine";
import ts from "typescript";
import { AddBracesToCaseMatch } from "./AddBracesToCaseMatch";

const { ast } = m;

export class AddBracesToCaseMatcher extends PatternMatcher<AddBracesToCaseMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.CaseClause],
  };

  constructor() {
    super(AddBracesToCaseMatch);
  }

  createPattern() {
    const captures = {};

    return {
      match: ast.caseClause({
        statements: p.not(p.array(ast.block())),
      }),
      captures,
    };
  }
}
