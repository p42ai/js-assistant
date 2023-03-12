
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { SelectExpressionOccurrencesMatch } from "./SelectExpressionOccurrencesMatch";

export class SelectExpressionOccurrencesTransformation extends Transformation<SelectExpressionOccurrencesMatch> {
  async apply(
    match: SelectExpressionOccurrencesMatch,
    tree: TransformedNodeTree
  ) {
    // The originally selected expression should be the first node path,
    // so it becomes the main selection when the multi-selection is created
    // in VS Code:
    return EditorOperation.compose(
      EditorOperation.selectNodes(
        tree,
        match.node,
        ...match.data.occurrences.filter(
          (expression) => expression !== match.node
        )
      )
    );
  }

  analyzeSafety(match: SelectExpressionOccurrencesMatch): Safety {
    return Safety.unknown();
  }

  getActionZones(
    match: SelectExpressionOccurrencesMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(`Select ${match.occurrenceCount} occurrences`, [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.QuickFix,
      },
    ]);
  }
}
