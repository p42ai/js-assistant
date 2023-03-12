
import UndefinedAliasAugmentation from "@p42/augmentation-undefined-alias";
import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { InvertConditionCandidate } from "./InvertConditionCandidate";

const { ast } = m;

export class InvertConditionMatcher extends PatternMatcher<InvertConditionCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.ConditionalExpression, ts.SyntaxKind.IfStatement],
  };

  requiredAugmentations = [UndefinedAliasAugmentation];

  createPattern() {
    const captures = {
      condition: capture.node<ts.Expression>(),
      innerCondition: capture.node<ts.Expression>(),
    };

    const matchCondition = p.or(
      captures.condition.record({
        match: ast.prefixUnaryExpression({
          operator: ts.SyntaxKind.ExclamationToken,
          operand: p.or(
            ast.parenthesizedExpression({
              expression: captures.innerCondition.record(),
            }),
            captures.innerCondition.record()
          ),
        }),
      }),
      captures.condition.record({
        match: captures.innerCondition.record(),
      })
    );

    return {
      match: p.or(
        ast.conditionalExpression({
          condition: matchCondition,
        }),
        ast.ifStatement({
          expression: matchCondition,
        })
      ),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: InvertConditionCandidate["node"],
    captures: InvertConditionCandidate["captures"],
    context: Context
  ): InvertConditionCandidate["data"] {
    const { condition } = captures;

    const hasNegationPrefix = ast.prefixUnaryExpression({
      operator: ts.SyntaxKind.ExclamationToken,
    })(condition, context);

    // TODO refactor to use equality check augmentation
    function isNotEqualsExpression(expression: ts.Expression) {
      return ast.binaryExpression({
        operator: [
          ts.SyntaxKind.ExclamationEqualsToken,
          ts.SyntaxKind.ExclamationEqualsEqualsToken,
        ],
      })(expression, context);
    }

    return {
      hasNegationPrefix,
      isNegated: hasNegationPrefix
        ? !isNotEqualsExpression(captures.innerCondition)
        : isNotEqualsExpression(condition),
    };
  }
}
