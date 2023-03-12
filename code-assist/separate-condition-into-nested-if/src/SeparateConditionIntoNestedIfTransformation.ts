
import {
  ActionZone,
  createActionZones,
  isSideEffectFree,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { SeparateConditionIntoNestedIfCandidate } from "./SeparateConditionIntoNestedIfCandidate";

export class SeparateConditionIntoNestedIfTransformation extends Transformation<SeparateConditionIntoNestedIfCandidate> {
  async apply(
    match: SeparateConditionIntoNestedIfCandidate,
    tree: TransformedNodeTree
  ) {
    tree.replace(
      match.node,
      tree.updateIfStatement(match.node, {
        expression: match.captures.fixedCondition,
        thenStatement: tree.createBlock({
          statements: [
            tree.createIfStatement({
              expression: match.captures.innerCondition,
              thenStatement: match.node.thenStatement,
              elseStatement: match.captures.elseIf.thenStatement,
            }),
          ],
        }),
        elseStatement: match.captures.elseIf.elseStatement ?? null,
      })
    );
  }

  analyzeSafety(match: SeparateConditionIntoNestedIfCandidate): Safety {
    const conditionIsSideEffectFree =
      isSideEffectFree(match.captures.fixedCondition, match.context) &&
      isSideEffectFree(match.captures.innerCondition, match.context);

    return conditionIsSideEffectFree
      ? Safety.safe()
      : Safety.warning(
          "invocation of getter or function calls in condition can change"
        );
  }

  getActionZones(
    match: SeparateConditionIntoNestedIfCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      "Separate repeated condition into nested if-else",
      [
        {
          range: NodeRange.ifStatementIfKeyword(match.node),
        },
        {
          range: NodeRange.node(match.node.expression),
        },
        {
          range: NodeRange.ifStatementElseKeyword(match.node),
        },
        {
          range: NodeRange.ifStatementIfKeyword(match.captures.elseIf),
        },
        {
          range: NodeRange.node(match.captures.elseIf.expression),
        },
      ]
    );
  }
}
