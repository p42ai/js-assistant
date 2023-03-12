import {
  capture,
  isSideEffectFree,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { RemoveRedundantElseMatch } from "./RemoveRedundantElseMatch";

const { ast } = m;

export class RemoverRedundantElseMatcher extends PatternMatcher<RemoveRedundantElseMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  constructor() {
    super(RemoveRedundantElseMatch);
  }

  createPattern() {
    const captures = {
      condition: capture.node<ts.Expression>(),
      elseIf: capture.node<ts.IfStatement>(),
      elseIfBody: capture.node<ts.Statement>(),
    };

    const negatedCondition = ast.prefixUnaryExpression({
      operator: ts.SyntaxKind.ExclamationToken,
      operand: p.or(
        ast.parenthesizedExpression({
          expression: captures.condition.record(),
        }),
        captures.condition.record()
      ),
    });

    return {
      match: p.or(
        captures.condition.checkpoint(
          ast.ifStatement({
            expression: captures.condition.record({
              match: isSideEffectFree,
            }),
            elseStatement: captures.elseIf.record({
              match: ast.ifStatement({
                expression: negatedCondition,
                thenStatement: captures.elseIfBody.record(),
              }),
            }),
          })
        ),
        captures.condition.checkpoint(
          ast.ifStatement({
            expression: negatedCondition,
            elseStatement: captures.elseIf.record({
              match: ast.ifStatement({
                expression: captures.condition.record({
                  match: isSideEffectFree,
                }),
                thenStatement: captures.elseIfBody.record(),
              }),
            }),
          })
        )
      ),
      captures,
    };
  }
}
