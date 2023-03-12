import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ConvertConditionalExpressionToIfElseCandidate } from "./ConvertConditionalExpressionToIfElseCandidate";

const { ast } = m;

export class ConvertConditionalExpressionToIfElseMatcher extends PatternMatcher<ConvertConditionalExpressionToIfElseCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.ReturnStatement, ts.SyntaxKind.ExpressionStatement],
  };

  createPattern() {
    const captures = {
      conditionalExpression: capture.node<ts.ConditionalExpression>(),
      assignmentExpression: capture.node<ts.BinaryExpression>(),
      type: capture.value<"return" | "assignment" | "expression">(),
    };

    return {
      match: p.or(
        captures.type.record({
          value: "return",
          match: ast.returnStatement({
            expression: captures.conditionalExpression.record({
              match: ast.conditionalExpression(),
            }),
          }),
        }),
        ast.expressionStatement({
          expression: p.or(
            captures.type.record({
              value: "assignment",
              match: captures.assignmentExpression.record({
                match: ast.binaryExpression({
                  // note: restricting the operator is not necessary here, because only assignment
                  // operators have a higher predence than the conditional operator. See
                  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
                  right: captures.conditionalExpression.record({
                    match: ast.conditionalExpression(),
                  }),
                }),
              }),
            }),
            captures.type.record({
              value: "expression",
              match: captures.conditionalExpression.record({
                match: ast.conditionalExpression(),
              }),
            })
          ),
        })
      ),
      captures,
    };
  }
}
