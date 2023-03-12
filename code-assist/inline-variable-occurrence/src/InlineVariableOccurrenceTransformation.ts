
import {
  ActionZone,
  createActionZones,
  EditorOperation,
  isConstantExpression,
  NodeRange,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { InlineVariableOccurrenceMatch } from "./InlineVariableOccurrenceMatch";

export class InlineVariableOccurrenceTransformation extends Transformation<InlineVariableOccurrenceMatch> {
  async apply(match: InlineVariableOccurrenceMatch, tree: TransformedNodeTree) {
    const replacement = tree.copy(match.captures.initializer);

    tree.replace(match.node, replacement);

    return EditorOperation.compose(
      EditorOperation.highlightNodes(tree, replacement)
    );
  }

  analyzeSafety(match: InlineVariableOccurrenceMatch): Safety {
    const messages = new SafetyMessageList();

    if (!isConstantExpression(match.captures.initializer, match.context)) {
      messages.warning("variable could have been modified");
    }

    return messages.produceSafe();
  }

  getActionZones(
    match: InlineVariableOccurrenceMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Inline variable occurrence", [
      {
        range: NodeRange.node(match.node),
      },
    ]);
  }
}
