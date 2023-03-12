import {
  AssignmentOperatorMapping,
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { PullOperatorOutOfAssignmentCandidate } from "./PullOperatorOutOfAssignmentCandidate";

const { ast } = m;

export class PullOperatorOutOfAssignmentMatcher extends PatternMatcher<PullOperatorOutOfAssignmentCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.BinaryExpression],
  };

  createPattern() {
    const captures = {
      targetExpression: capture.node<ts.Expression>(),
      assignmentOperator: capture.value<ts.BinaryOperator>(),
      operand: capture.node<ts.Expression>(),
    };

    return {
      match: ast.binaryExpression({
        left: captures.targetExpression.record(),
        operator: captures.assignmentOperator.record({
          match: p.includedIn(
            ...AssignmentOperatorMapping.getAssignmentOperators()
          ),
        }) as p.Predicate<ts.BinaryOperator, Context>,
        right: captures.operand.record(),
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: PullOperatorOutOfAssignmentCandidate["node"],
    captures: PullOperatorOutOfAssignmentCandidate["captures"],
    context: Context
  ): PullOperatorOutOfAssignmentCandidate["data"] {
    return {
      regularOperator: AssignmentOperatorMapping.getRegularOperator(
        captures.assignmentOperator
      )!,
    };
  }
}
