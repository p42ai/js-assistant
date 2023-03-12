
import {
  ActionZone,
  BinaryOperator,
  Condition,
  createActionZones,
  isSideEffectFree,
  matchers as m,
  NodeRange,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { FlipOperatorCandidate } from "./FlipOperatorCandidate";
import { flipOperator } from "./FlipOperatorMapping";

const { type } = m;

export class FlipOperatorTransformation extends Transformation<FlipOperatorCandidate> {
  async apply(match: FlipOperatorCandidate, tree: TransformedNodeTree) {
    tree.replace(
      match.node,
      tree.updateBinaryExpression(match.node, {
        left: match.node.right,
        right: match.node.left,
        operator: flipOperator(match.node.operatorToken.kind),
      })
    );
  }

  analyzeSafety(match: FlipOperatorCandidate): Safety {
    const { context } = match;
    const messages = new SafetyMessageList();

    const operator = match.node.operatorToken.kind;
    const { left, right } = match.node;

    const leftIsSideEffectFree = isSideEffectFree(left, context);
    const rightIsSideEffectFree = isSideEffectFree(right, context);

    if (BinaryOperator.isShortCircuiting(operator)) {
      if (!leftIsSideEffectFree || !rightIsSideEffectFree) {
        messages.warning(`changes evaluation order`);
      }

      // condition: only truthy/falsy matters.
      // expression statement: return value does not matter.
      const onlyTruthOfReturnMatters =
        Condition.isCondition(match.node, context) ||
        ts.isExpressionStatement(match.node.parent);

      if (!onlyTruthOfReturnMatters) {
        messages.warning(`changes short-circuiting result`);
      }
    } else if (!leftIsSideEffectFree && !rightIsSideEffectFree) {
      messages.warning("changes evaluation order");
    }

    if (
      operator === ts.SyntaxKind.PlusToken &&
      !(type.numeric(left, context) && type.numeric(right, context))
    ) {
      messages.warning("changes result of string concatenation");
    }

    return messages.produceSafe();
  }

  getActionZones(
    match: FlipOperatorCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      `Flip ${ts.tokenToString(match.node.operatorToken.kind)}`,
      [
        {
          range: NodeRange.binaryExpressionOperator(match.node),
        },
      ]
    );
  }
}
