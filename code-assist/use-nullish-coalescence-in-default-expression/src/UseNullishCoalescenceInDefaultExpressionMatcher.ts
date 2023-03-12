
import {
  conditionalAssignment,
  ConditionalAssignmentAugmentation,
} from "@p42/augmentation-conditional-assignment";
import EqualityCheckAugmentation from "@p42/augmentation-equality-check";
import NullishCheckAugmentation, {
  nullishCheck,
} from "@p42/augmentation-nullish-check";
import UndefinedAliasAugmentation from "@p42/augmentation-undefined-alias";
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { UseNullishCoalescenceInDefaultExpressionCandidate } from "./UseNullishCoalescenceInDefaultExpressionCandidate";

const { ast } = m;

export class UseNullishCoalescenceInDefaultExpressionMatcher extends PatternMatcher<UseNullishCoalescenceInDefaultExpressionCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.ConditionalExpression],
    patterns: [ConditionalAssignmentAugmentation],
  };

  requiredAugmentations = [
    UndefinedAliasAugmentation,
    EqualityCheckAugmentation,
    NullishCheckAugmentation,
    ConditionalAssignmentAugmentation,
  ];

  createPattern() {
    const captures = {
      checkedExpression: capture.node<ts.Expression>(),
      default: capture.node<ts.Expression>(),
      variableName: capture.value<string>(),
    };

    const defaultExpression = captures.default.record();
    const checkedExpression = captures.checkedExpression.record();
    const variableName = captures.variableName.record();

    return {
      match: p.or(
        ast.conditionalExpression({
          condition: nullishCheck({
            isNegated: true,
            checkedExpression,
          }),
          whenTrue: checkedExpression,
          whenFalse: defaultExpression,
        }),
        ast.conditionalExpression({
          condition: nullishCheck({
            isNegated: false,
            checkedExpression,
          }),
          whenTrue: defaultExpression,
          whenFalse: checkedExpression,
        }),
        conditionalAssignment({
          type: "IF_ELSE_STATEMENT",
          variableName,
          condition: nullishCheck({
            isNegated: true,
            checkedExpression,
          }),
          whenTrue: checkedExpression,
          whenFalse: defaultExpression,
        }),
        conditionalAssignment({
          type: "IF_ELSE_STATEMENT",
          variableName,
          condition: nullishCheck({
            isNegated: false,
            checkedExpression,
          }),
          whenTrue: defaultExpression,
          whenFalse: checkedExpression,
        })
      ),
      captures,
    };
  }
}
