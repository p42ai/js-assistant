
import { matchers as m, PatternMatcher, predicates as p } from "@p42/engine";
import ts from "typescript";
import { InsertElseMatch } from "./InsertElseMatch";

const { ast } = m;

export class InsertElseMatcher extends PatternMatcher<InsertElseMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  constructor() {
    super(InsertElseMatch);
  }

  createPattern() {
    const captures = {};

    return {
      match: ast.ifStatement({
        elseStatement: p.isUndefined,
      }),
      captures,
    };
  }
}
