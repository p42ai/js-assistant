import { isSideEffectFree, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { RemoveUnnecessaryExpressionStatementCandidate } from "./RemoveUnnecessaryExpressionStatementCandidate";

const { ast } = m;

export class RemoveUnnecessaryExpressionStatementMatcher extends PatternMatcher<RemoveUnnecessaryExpressionStatementCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.ExpressionStatement],
  };

  createPattern() {
    const captures = {};

    return {
      match: ast.expressionStatement({
        expression: ast.expression({
          constraints: [
            isSideEffectFree,
            // do not remove strict mode directives:
            (expression) =>
              !ts.isStringLiteral(expression) ||
              !expression.text.startsWith("use "),
          ],
        }),
      }),
      captures,
    };
  }
}
