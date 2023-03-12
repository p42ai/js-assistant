
import {
  matchers as m,
  PatternMatcher,
  predicates as p,
  SwitchStatement,
} from "@p42/engine";
import ts from "typescript";
import { ConvertSwitchToIfElseMatch } from "./ConvertSwitchToIfElseMatch";

const { ast } = m;

export class ConvertSwitchToIfElseMatcher extends PatternMatcher<ConvertSwitchToIfElseMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.SwitchStatement],
  };

  constructor() {
    super(ConvertSwitchToIfElseMatch);
  }

  createPattern() {
    const captures = {};

    return {
      match: ast.switchStatement({
        caseBlock: ast.caseBlock({
          clauses: p.some(ast.caseClause()),
        }),
        parent: p.not(ast.labelledStatement()),
        constraints: [p.not(SwitchStatement.hasInnerBreak)],
      }),
      captures,
    };
  }
}
