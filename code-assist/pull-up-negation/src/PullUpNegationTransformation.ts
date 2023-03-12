
import {
  ActionZone,
  BinaryExpressionInverter,
  BinaryOperator,
  Condition,
  createActionZones,
  matchers as m,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { PullUpNegationCandidate } from "./PullUpNegationCandidate";

const { type } = m;

export class PullUpNegationTransformation extends Transformation<PullUpNegationCandidate> {
  async apply(match: PullUpNegationCandidate, tree: TransformedNodeTree) {
    const binaryExpression = match.node;

    tree.replace(
      match.node,
      tree.createPrefixUnaryExpression({
        operator: ts.SyntaxKind.ExclamationToken,
        operand: BinaryExpressionInverter.invertExpression(
          tree,
          binaryExpression,
          true
        ),
      })
    );
  }

  analyzeSafety(match: PullUpNegationCandidate): Safety {
    const { context } = match;
    const operator = match.node.operatorToken.kind;
    const info = BinaryExpressionInverter.getInversion(operator);

    // negation can affect the return type of short circuiting operations:
    if (BinaryOperator.isShortCircuiting(operator)) {
      // in conditions, the truthy/falsy evaluation does not change:
      if (Condition.isCondition(match.node, context)) {
        return Safety.safe();
      }

      // when both arguments are already boolean, result type does not change:
      if (
        type.boolean(match.node.left, context) &&
        type.boolean(match.node.right, context)
      ) {
        return Safety.safe();
      }

      return Safety.warning("can change result type to boolean");
    }

    // some comparison operations can have different nullish/nan behavior when negated:
    return info.isSafeForNullishAndNaN
      ? Safety.safe()
      : Safety.warning("can affect result for nullish and NaN values");
  }

  getActionZones(
    match: PullUpNegationCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Pull up negation", [
      {
        range: NodeRange.binaryExpressionOperator(match.node),
      },
    ]);
  }
}
