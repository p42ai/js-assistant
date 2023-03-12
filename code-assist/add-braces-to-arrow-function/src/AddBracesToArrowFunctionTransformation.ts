import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  findFunctionLikeChildren,
  NodeRange,
  Range,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { AddBracesToArrowFunctionMatch } from "./AddBracesToArrowFunctionMatch";

export class AddBracesToArrowFunctionTransformation extends Transformation<AddBracesToArrowFunctionMatch> {
  async apply(match: AddBracesToArrowFunctionMatch, tree: TransformedNodeTree) {
    tree.replace(
      match.node.body,
      tree.createBlock({
        statements: [
          tree.createReturnStatement({
            expression: match.captures.bodyExpression,
          }),
        ],
      })
    );
  }

  analyzeSafety(match: AddBracesToArrowFunctionMatch) {
    return Safety.safe();
  }

  getActionZones(
    match: AddBracesToArrowFunctionMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Add {…} to arrow function", [
      {
        range: new Range(
          match.node.getStart(),
          match.captures.bodyExpression.getStart()
        ),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      ...NodeRange.node(match.node)
        .subtract(
          findFunctionLikeChildren(match.node).map((node) =>
            NodeRange.fullNode(node)
          )
        )
        .map((range) => ({
          range,
          level: CodeAssistLevel.Regular,
        })),
    ]);
  }
}
