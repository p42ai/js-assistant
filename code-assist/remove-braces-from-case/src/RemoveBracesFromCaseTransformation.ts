
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  Range,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { RemoveBracesFromCaseMatch } from "./RemoveBracesFromCaseMatch";

export class RemoveBracesFromCaseTransformation extends Transformation<RemoveBracesFromCaseMatch> {
  async apply(match: RemoveBracesFromCaseMatch, tree: TransformedNodeTree) {
    tree.replace(
      match.node,
      tree.updateCaseClause(match.node, {
        statements: match.captures.block.statements.slice(),
      })
    );
  }

  // TODO what if variables are used in fall-through / variable declarations are used?
  analyzeSafety(match: RemoveBracesFromCaseMatch): Safety {
    const messages = new SafetyMessageList();

    return messages.produceUnknown();
  }

  getActionZones(
    match: RemoveBracesFromCaseMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Remove {…} from case", [
      {
        range: new Range(match.node.getStart(), match.captures.block.end),
        level: CodeAssistLevel.QuickFix,
      },
    ]);
  }
}
