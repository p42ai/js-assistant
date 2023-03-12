
import {
  CodeAssistMetadata,
  CodeAssistType,
  MoveTransformation,
  SafetyMessageList,
} from "@p42/engine";
import ts from "typescript";
import metadata from "./code-assist.json";
import { MoveArrayElementMatch } from "./MoveArrayElementMatch";
import { MoveArrayElementMatcher } from "./MoveArrayElementMatcher";

export default class MoveArrayElementCodeAssist extends CodeAssistType<MoveArrayElementMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveArrayElementMatcher(),
      MoveTransformation.createPair({
        upActionLabel: "Move array element up",
        downActionLabel: "Move array element down",
        updateContainer: (
          container: ts.ArrayLiteralExpression,
          newChildren: Array<ts.Expression>,
          tree
        ) =>
          tree.updateArrayLiteralExpression(container, {
            elements: newChildren,
          }),
        analyzeSafety: (match: MoveArrayElementMatch) => {
          const messages = new SafetyMessageList();
          messages.warning("changes array content");
          return messages.produceUnknown();
        },
      })
    );
  }
}
