
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  findFunctionLikeChildren,
  NodeRange,
  Range,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { RemoveBracesFromArrowFunctionMatch } from "./RemoveBracesFromArrowFunctionMatch";

export class RemoveBracesFromArrowFunctionTransformation extends Transformation<RemoveBracesFromArrowFunctionMatch> {
  async apply(
    match: RemoveBracesFromArrowFunctionMatch,
    tree: TransformedNodeTree
  ) {
    const { returnedExpression } = match.captures;

    tree.replace(
      match.node.body,
      ts.isObjectLiteralExpression(returnedExpression)
        ? tree.createParenthesizedExpression({
            expression: returnedExpression,
          })
        : returnedExpression
    );
  }

  analyzeSafety(match: RemoveBracesFromArrowFunctionMatch) {
    return Safety.safe();
  }

  getSuggestion(
    match: RemoveBracesFromArrowFunctionMatch,
    safety: Safety
  ): Suggestion | null {
    return {
      description: "You can remove the braces {…} from the arrow function.",
      shortActionLabel: "Remove",
      highlightRanges: [
        NodeRange.firstCharactersOfNode(match.node.body),
        NodeRange.lastCharactersOfNode(match.node.body),
      ],
    };
  }

  getActionZones(
    match: RemoveBracesFromArrowFunctionMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Remove {…} from arrow function", [
      {
        range: NodeRange.firstCharactersOfNode(match.node.body),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      {
        // user feedback: expect quickfix action on the 'return' keyword
        // https://github.com/p42ai/refactor-vscode/issues/51
        range: new Range(
          match.node.getStart(),
          match.captures.returnedExpression.getFullStart()
        ),
        level: CodeAssistLevel.QuickFix,
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
