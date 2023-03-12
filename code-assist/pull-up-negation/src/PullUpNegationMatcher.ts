import { matchers as m, PatternMatcher, predicates as p } from "@p42/engine";
import ts from "typescript";
import { PullUpNegationCandidate } from "./PullUpNegationCandidate";

const { ast } = m;

export class PullUpNegationMatcher extends PatternMatcher<PullUpNegationCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.BinaryExpression],
  };

  createPattern() {
    const captures = {};

    return {
      match: ast.binaryExpression({
        operator: p.includedIn<ts.BinaryOperator>(
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
      captures,
    };
  }
}
