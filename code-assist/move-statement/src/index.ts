
import {
  CodeAssistMetadata,
  CodeAssistType,
  MoveTransformation,
  Safety,
  SafetyMessageList,
} from "@p42/engine";
import ts from "typescript";
import metadata from "./code-assist.json";
import { MoveStatementMatch } from "./MoveStatementMatch";
import { MoveStatementMatcher } from "./MoveStatementMatcher";

export default class MoveStatementCodeAssist extends CodeAssistType<MoveStatementMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveStatementMatcher(),
      MoveTransformation.createPair({
        upActionLabel: "Move statement up",
        downActionLabel: "Move statement down",
        updateContainer: (
          container: ts.BlockLike,
          newChildren: Array<ts.Statement>,
          tree
        ) =>
          tree.updateBlockLike(container, {
            statements: newChildren,
          }),
        analyzeSafety: (match: MoveStatementMatch): Safety => {
          const messages = new SafetyMessageList();
          messages.warning("changes execution order");
          return messages.produceUnknown();
        },
      })
    );
  }
}
