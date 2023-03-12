
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Range,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { FlattenArrayRestPropertyMatch } from "./FlattenArrayRestPropertyMatch";

export class FlattenArrayRestPropertyTransformation extends Transformation<FlattenArrayRestPropertyMatch> {
  async apply(match: FlattenArrayRestPropertyMatch, tree: TransformedNodeTree) {
    const { data } = match;

    switch (data.type) {
      case ts.SyntaxKind.BindingElement: {
        const { innerExpression, outerExpression } = data;

        tree.replace(
          outerExpression,
          tree.updateArrayBindingPattern(outerExpression, {
            elements: replaceLastNodeWith(
              outerExpression.elements,
              innerExpression.elements
            ),
          })
        );

        return;
      }
      case ts.SyntaxKind.SpreadElement: {
        const { innerExpression, outerExpression } = data;

        tree.replace(
          outerExpression,
          tree.updateArrayLiteralExpression(outerExpression, {
            elements: replaceLastNodeWith(
              outerExpression.elements,
              innerExpression.elements
            ),
          })
        );

        return;
      }
    }
  }

  analyzeSafety(match: FlattenArrayRestPropertyMatch): Safety {
    return Safety.safe();
  }

  getSuggestion(
    match: FlattenArrayRestPropertyMatch,
    safety: Safety
  ): Suggestion | null {
    return {
      description: "You can flatten the ...[] expression into the outer [].",
      shortActionLabel: "Flatten",
      highlightRanges: [
        NodeRange.firstCharactersOfNode(match.node, 4),
        NodeRange.lastCharactersOfNode(match.node),
      ],
    };
  }

  getActionZones(
    match: FlattenArrayRestPropertyMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Flatten ...[]", [
      {
        range: NodeRange.firstCharactersOfNode(match.node, 4),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}

// TODO move into engine
function replaceLastNodeWith<T extends ts.Node>(
  nodes: ts.NodeArray<T>,
  replacements: ts.NodeArray<T>
) {
  const elements = nodes.slice();
  elements.splice(nodes.length - 1, 1, ...replacements);
  return elements;
}
