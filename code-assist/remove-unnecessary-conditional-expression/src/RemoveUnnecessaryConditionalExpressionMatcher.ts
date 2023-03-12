import {
  capture,
  matchers as m,
  predicates as p,
  PatternMatcher,
  Context,
} from "@p42/engine";
import ts from "typescript";
import { RemoveUnnecessaryConditionalExpressionMatch } from "./RemoveUnnecessaryConditionalExpressionMatch";

const { ast, type } = m;

export class RemoveUnnecessaryConditionalExpressionMatcher extends PatternMatcher<RemoveUnnecessaryConditionalExpressionMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.ConditionalExpression],
  };

  constructor() {
    super(RemoveUnnecessaryConditionalExpressionMatch);
  }

  createPattern() {
    const captures = {
      replacement: capture.node<ts.Expression>(),
      type: capture.value<"same-result" | "condition-is-result">(),
    };

    return {
      match: p.or(
        captures.type.record({
          value: "same-result",
          match: captures.replacement.checkpoint(
            ast.conditionalExpression({
              whenTrue: captures.replacement.record(),
              whenFalse: captures.replacement.record(),
            })
          ),
        }),
        captures.type.record({
          value: "condition-is-result",
          match: ast.conditionalExpression({
            condition: captures.replacement.record(),
            whenTrue: ast.trueKeyword,
            whenFalse: ast.falseKeyword,
          }),
        })
      ),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: RemoveUnnecessaryConditionalExpressionMatch["node"],
    captures: RemoveUnnecessaryConditionalExpressionMatch["captures"],
    context: Context
  ): RemoveUnnecessaryConditionalExpressionMatch["data"] {
    return {
      isBooleanCondition: type.boolean(matchedNode.condition, context),
    };
  }
}
