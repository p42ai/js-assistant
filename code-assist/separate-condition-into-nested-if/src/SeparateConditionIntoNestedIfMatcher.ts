import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { SeparateConditionIntoNestedIfCandidate } from "./SeparateConditionIntoNestedIfCandidate";

const { ast } = m;

export class SeparateConditionIntoNestedIfMatcher extends PatternMatcher<SeparateConditionIntoNestedIfCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  createPattern() {
    const captures = {
      fixedCondition: capture.node<ts.Expression>(),
      innerCondition: capture.node<ts.Expression>(),
      elseIf: capture.node<ts.IfStatement>(),
    };

    return {
      match: ast.ifStatement({
        expression: ast.binaryExpression({
          left: captures.fixedCondition.record(),
          operator: ts.SyntaxKind.AmpersandAmpersandToken,
          right: captures.innerCondition.record(),
        }),
        elseStatement: captures.elseIf.record({
          match: ast.ifStatement({
            expression: ast.binaryExpression({
              left: captures.fixedCondition.record(),
              operator: ts.SyntaxKind.AmpersandAmpersandToken,
              right: ast.prefixUnaryExpression({
                operator: ts.SyntaxKind.ExclamationToken,
                operand: p.or(
                  ast.parenthesizedExpression({
                    expression: captures.innerCondition.record(),
                  }),
                  captures.innerCondition.record()
                ),
              }),
            }),
          }),
        }),
      }),
      captures,
    };
  }
}
