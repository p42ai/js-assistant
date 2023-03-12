import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { SimplifyBinaryExpressionCandidate } from "./SimplifyBinaryExpressionCandidate";

const { ast } = m;

export class SimplifyBinaryExpressionMatcher extends PatternMatcher<SimplifyBinaryExpressionCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.BinaryExpression],
  };

  createPattern() {
    const captures = {
      operand: capture.node<ts.Expression>(),
    };

    return {
      match: ast.binaryExpression({
        left: captures.operand.record(),
        operator: p.includedIn(
          ts.SyntaxKind.BarBarToken,
          ts.SyntaxKind.AmpersandAmpersandToken,
          ts.SyntaxKind.QuestionQuestionToken
        ) as p.Predicate<ts.BinaryOperator, Context>,
        right: captures.operand.record(),
      }),
      captures,
    };
  }
}
