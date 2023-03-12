
import { matchers as m, PatternMatcher, capture } from "@p42/engine";
import ts from "typescript";
import { RemoveConsoleLogCandidate } from "./RemoveConsoleLogCandidate";

const { ast } = m;

export class RemoveConsoleLogMatcher extends PatternMatcher<RemoveConsoleLogCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.ExpressionStatement],
  };

  createPattern() {
    const captures = {
      propertyAccess: capture.node<ts.PropertyAccessExpression>(),
    };

    return {
      match: ast.expressionStatement({
        expression: ast.callExpression({
          expression: captures.propertyAccess.record({
            match: ast.propertyAccessExpression({
              expression: ast.identifier({
                text: "console",
              }),
              name: ast.identifier({
                text: "log",
              }),
            }),
          }),
        }),
      }),
      captures,
    };
  }
}
