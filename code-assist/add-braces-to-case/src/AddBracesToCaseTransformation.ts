import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { AddBracesToCaseMatch } from "./AddBracesToCaseMatch";

export class AddBracesToCaseTransformation extends Transformation<AddBracesToCaseMatch> {
  async apply(match: AddBracesToCaseMatch, tree: TransformedNodeTree) {
    tree.replace(
      match.node,
      tree.updateCaseClause(match.node, {
        statements: [
          tree.createBlock({
            statements: match.node.statements.slice(),
          }),
        ],
      })
    );
  }

  // TODO what if variables are used in fall-through / variable declarations are used?
  analyzeSafety(match: AddBracesToCaseMatch): Safety {
    const messages = new SafetyMessageList();

    return messages.produceUnknown();
  }

  getActionZones(
    match: AddBracesToCaseMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Add {…} to case", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.QuickFix,
      },
    ]);
  }
}
