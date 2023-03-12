
import {
  ActionZone,
  createActionZones,
  NodeRange,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { ReplaceExpressionWithExistingVariableMatch } from "./ReplaceExpressionWithExistingVariableMatch";

export class ReplaceExpressionWithExistingVariableTransformation extends Transformation<ReplaceExpressionWithExistingVariableMatch> {
  async apply(
    match: ReplaceExpressionWithExistingVariableMatch,
    tree: TransformedNodeTree
  ) {
    tree.replace(
      match.node,
      tree.createIdentifier({
        text: match.getVariableName(),
      })
    );
  }

  analyzeSafety(match: ReplaceExpressionWithExistingVariableMatch): Safety {
    const messages = new SafetyMessageList();

    if (match.captures.variableDeclaration.type != null) {
      messages.warning("could change type");
    }

    return messages.produceUnknown();
  }

  getActionZones(
    match: ReplaceExpressionWithExistingVariableMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(`Replace with '${match.getVariableName()}'`, [
      {
        range: NodeRange.node(match.node),
      },
    ]);
  }
}
