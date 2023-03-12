
import {
  CodeAssistMetadata,
  CodeAssistType,
  MoveTransformation,
  SafetyMessageList,
} from "@p42/engine";
import ts from "typescript";
import metadata from "./code-assist.json";
import { MoveObjectPropertyMatch } from "./MoveObjectPropertyMatch";
import { MoveObjectPropertyMatcher } from "./MoveObjectPropertyMatcher";

export default class MoveObjectPropertyCodeAssist extends CodeAssistType<MoveObjectPropertyMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveObjectPropertyMatcher(),
      MoveTransformation.createPair({
        upActionLabel: "Move property up",
        downActionLabel: "Move property down",
        updateContainer: (
          container: ts.ObjectLiteralExpression,
          newChildren: Array<ts.ObjectLiteralElementLike>,
          tree
        ) =>
          tree.updateObjectLiteralExpression(container, {
            properties: newChildren,
          }),
        analyzeSafety: (match: MoveObjectPropertyMatch) => {
          const messages = new SafetyMessageList();
          messages.warning("changes properties order");
          return messages.produceUnknown();
        },
      })
    );
  }
}
