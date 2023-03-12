import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { SplitIfCandidate } from "./SplitIfCandidate";

const { ast } = m;

export class SplitIfMatcher extends PatternMatcher<SplitIfCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.BinaryExpression],
  };

  createPattern() {
    const captures = {
      ifStatement: capture.node<ts.IfStatement>(),
      operator:
        capture.value<
          ts.SyntaxKind.BarBarToken | ts.SyntaxKind.AmpersandAmpersandToken
        >(),
    };

    return {
      match: ast.binaryExpression({
        operator: [
          ts.SyntaxKind.AmpersandAmpersandToken,
          ts.SyntaxKind.BarBarToken,
        ],
        constraints: [
          (binaryExpression, context) => {
            let currentBinaryExpression = binaryExpression;
            let { parent } = currentBinaryExpression;
            const operator = binaryExpression.operatorToken.kind;

            // operator has to be of the same kind to prevent operator
            // precedence bugs that could change the code behavior
            while (
              ts.isBinaryExpression(parent) &&
              parent.operatorToken.kind === operator
            ) {
              currentBinaryExpression = parent;
              parent = currentBinaryExpression.parent;
            }

            if (!ts.isIfStatement(parent)) {
              return false;
            }

            captures.ifStatement.record()(parent, context);
            captures.operator.record()(operator, context);

            return true;
          },
        ],
      }),
      captures,
    };
  }
}
