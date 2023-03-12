
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
import { ConvertBracketNotationPropertyAccessToDotNotationCandidate } from "./ConvertBracketNotationPropertyAccessToDotNotationCandidate";

export class ConvertBracketNotationPropertyAccessToDotNotationTransformation extends Transformation<ConvertBracketNotationPropertyAccessToDotNotationCandidate> {
  async apply(
    match: ConvertBracketNotationPropertyAccessToDotNotationCandidate,
    tree: TransformedNodeTree
  ) {
    const { expression, questionDotToken } = match.node;
    const { name } = match.captures;

    tree.replace(
      match.node,
      questionDotToken != null
        ? tree.createPropertyAccessChain({
            expression,
            name,
            questionDotToken,
          })
        : tree.createPropertyAccessExpression({
            expression,
            name,
          })
    );
  }

  analyzeSafety(
    match: ConvertBracketNotationPropertyAccessToDotNotationCandidate
  ) {
    return Safety.safe();
  }

  getSuggestion(
    match: ConvertBracketNotationPropertyAccessToDotNotationCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can convert the property access ['${match.captures.name}'] to the dot notation.`,
      shortActionLabel: "Convert",
      highlightRanges: [
        new Range(
          match.node.argumentExpression.pos - 1,
          match.node.argumentExpression.end + 1
        ),
      ],
    };
  }

  getActionZones(
    match: ConvertBracketNotationPropertyAccessToDotNotationCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to dot notation", [
      {
        range: new Range(
          match.node.argumentExpression.pos - 1,
          match.node.argumentExpression.pos
        ),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      {
        range: NodeRange.node(match.node),
      },
    ]);
  }
}
