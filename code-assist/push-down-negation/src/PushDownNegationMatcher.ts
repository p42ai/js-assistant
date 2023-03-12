import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { PushDownNegationCandidate } from "./PushDownNegationCandidate";

const { ast } = m;

export class PushDownNegationMatcher extends PatternMatcher<PushDownNegationCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.PrefixUnaryExpression],
  };

  createPattern() {
    const captures = {
      binaryExpression: capture.node<ts.BinaryExpression>(),
      operator:
        capture.value<PushDownNegationCandidate["captures"]["operator"]>(),
    };

    return {
      match: ast.prefixUnaryExpression({
        operator: ts.SyntaxKind.ExclamationToken,
        operand: ast.parenthesizedExpression({
          expression: captures.binaryExpression.record({
            match: ast.binaryExpression({
              operator: captures.operator.record({
                match: p.includedIn<ts.BinaryOperator>(
                  ts.SyntaxKind.BarBarToken,
                  ts.SyntaxKind.AmpersandAmpersandToken,
                  ts.SyntaxKind.EqualsEqualsEqualsToken,
                  ts.SyntaxKind.EqualsEqualsToken,
                  ts.SyntaxKind.ExclamationEqualsEqualsToken,
                  ts.SyntaxKind.ExclamationEqualsToken,
                  ts.SyntaxKind.GreaterThanEqualsToken,
                  ts.SyntaxKind.GreaterThanToken,
                  ts.SyntaxKind.LessThanEqualsToken,
                  ts.SyntaxKind.LessThanToken
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
