
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  NodeRange,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { InsertElseMatch } from "./InsertElseMatch";

export class InsertElseTransformation extends Transformation<InsertElseMatch> {
  async apply(match: InsertElseMatch, tree: TransformedNodeTree) {
    const elseBlock = tree.createBlock({
      statements: [],
      forceLeadingNewLine: true,
    });

    tree.replace(
      match.node,
      tree.updateIfStatement(match.node, {
        elseStatement: elseBlock,
      })
    );

    return EditorOperation.compose(
      EditorOperation.select({
        nodePath: tree.getNodePath(elseBlock),
      })
    );
  }

  analyzeSafety(match: InsertElseMatch): Safety {
    const messages = new SafetyMessageList();
    return messages.produceSafe();
  }

  getActionZones(match: InsertElseMatch, isSuggestion: boolean): ActionZone[] {
    return createActionZones("Insert else", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.Regular,
      },
    ]);
  }
}
