import {
  capture,
  PatternMatcher,
  predicates as p,
  matchers as m,
  Context,
} from "@p42/engine";
import ts from "typescript";

import {
  ConditionalAssignmentMatch,
  ConditionalAssignmentType,
} from "./ConditionalAssignmentMatch";

const { ast } = m;

export class ConditionalAssignmentMatcher extends PatternMatcher<ConditionalAssignmentMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.BinaryExpression, ts.SyntaxKind.IfStatement],
  };

  createPattern() {
    const captures = {
      variableName: capture.value<string>(),
      condition: capture.node<ts.Expression>(),
      whenTrue: capture.node<ts.Expression>(),
      whenFalse: capture.node<ts.Expression>(),
      type: capture.value<ConditionalAssignmentType>(),
    };

    function assignment(
      assignedValue: p.OptionalPredicate<ts.Expression, Context>
    ) {
      return ast.binaryExpression({
        left: ast.identifier({
          text: captures.variableName.record(),
        }),
        operator: ts.SyntaxKind.EqualsToken,
        right: assignedValue,
      });
    }

    return {
      match: p.or(
        captures.type.record({
          value: "IF_ELSE_STATEMENT",
          match: ast.ifStatement({
            expression: captures.condition.record(),
            thenStatement: ast.singleStatementBlock({
              statement: ast.expressionStatement({
                expression: assignment(captures.whenTrue.record()),
              }),
            }),
            elseStatement: ast.singleStatementBlock({
              statement: ast.expressionStatement({
                expression: assignment(captures.whenFalse.record()),
              }),
            }),
          }),
        }),
        captures.type.record({
          value: "CONDITIONAL_EXPRESSION",
          match: assignment(
            ast.conditionalExpression({
              condition: captures.condition.record(),
              whenTrue: captures.whenTrue.record(),
              whenFalse: captures.whenFalse.record(),
            })
          ),
        })
      ),
      captures,
    };
  }
}
