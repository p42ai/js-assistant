import {
  AssignmentOperatorMapping,
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { PushOperatorIntoAssignmentCandidate } from "./PushOperatorIntoAssignmentCandidate";

const { ast, type } = m;

export class PushOperatorIntoAssignmentMatcher extends PatternMatcher<PushOperatorIntoAssignmentCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.BinaryExpression],
  };

  createPattern() {
    const captures = {
      targetExpression: capture.node<ts.Expression>(),
      regularOperator: capture.value<ts.BinaryOperator>(),
      operand: capture.node<ts.Expression>(),
      isOperandFirst: capture.value<boolean>(),
    };

    return {
      match: ast.binaryExpression({
        left: captures.targetExpression.record(),
        operator: ts.SyntaxKind.EqualsToken,
        right: p.or(
          captures.isOperandFirst.record({
            value: false,
            match: ast.binaryExpression({
              left: captures.targetExpression.record(),
              operator: captures.regularOperator.record({
                match: p.includedIn(
                  ...AssignmentOperatorMapping.getRegularOperators()
                ),
              }) as p.Predicate<ts.BinaryOperator, Context>,
              right: m.maybeParenthesized(captures.operand.record()),
            }),
          }),
          // inverted expression can be converted if operator is commutative
          // and both operands are numbers:
          captures.isOperandFirst.record({
            value: true,
            match: ast.binaryExpression({
              left: m.maybeParenthesized(
                captures.operand.record({
                  match: ast.expression({
                    constraints: [type.numeric],
                  }),
                })
              ),
              operator: captures.regularOperator.record({
                match: p.includedIn(
                  ...AssignmentOperatorMapping.getCommutativeRegularOperators()
                ),
              }) as p.Predicate<ts.BinaryOperator, Context>,
              right: p.and(captures.targetExpression.record(), type.numeric),
            }),
          })
        ),
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: PushOperatorIntoAssignmentCandidate["node"],
    captures: PushOperatorIntoAssignmentCandidate["captures"],
    context: Context
  ): PushOperatorIntoAssignmentCandidate["data"] {
    return {
      assignmentOperator: AssignmentOperatorMapping.getAssignmentOperator(
        captures.regularOperator
      )!,
    };
  }
}
