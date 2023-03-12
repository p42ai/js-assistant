import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { ConvertAndAndGuardToIfStatementCandidate } from "./ConvertAndAndGuardToIfStatementCandidate";

const { ast } = m;

export class ConvertAndAndGuardToIfStatementMatcher extends PatternMatcher<ConvertAndAndGuardToIfStatementCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.ExpressionStatement],
  };

  createPattern() {
    const captures = {
      guard: capture.node<ts.Expression>(),
      guardedExpression: capture.node<ts.Expression>(),
    };

    return {
      match: ast.expressionStatement({
        expression: ast.binaryExpression({
          left: captures.guard.record(),
          operator: ts.SyntaxKind.AmpersandAmpersandToken,
          right: m.maybeParenthesized(captures.guardedExpression.record()),
        }),
      }),
      captures,
    };
  }
}
