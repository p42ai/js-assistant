
import {
  matchers as m,
  PatternMatcher,
  predicates as p,
  SwitchStatement,
} from "@p42/engine";
import ts from "typescript";
import { SimplifySwitchMatch } from "./SimplifySwitchMatch";

const { ast } = m;

export class SimplifySwitchMatcher extends PatternMatcher<SimplifySwitchMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.SwitchStatement],
  };

  constructor() {
    super(SimplifySwitchMatch);
  }

  createPattern() {
    const captures = {};

    return {
      match: ast.switchStatement({
        caseBlock: ast.caseBlock({
          clauses: p.not(
            p.some(
              p.or(
                ast.caseClause(),
                ast.defaultClause({
                  constraints: [SwitchStatement.hasInnerBreak],
                })
              )
            )
          ),
        }),
      }),
      captures,
    };
  }
}
