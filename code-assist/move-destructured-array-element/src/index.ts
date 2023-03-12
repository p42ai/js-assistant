
import {
  CodeAssistMetadata,
  CodeAssistType,
  MoveTransformation,
  SafetyMessageList,
} from "@p42/engine";
import ts from "typescript";
import metadata from "./code-assist.json";
import { MoveDestructuredArrayElementMatch } from "./MoveDestructuredArrayElementMatch";
import { MoveDestructuredArrayElementMatcher } from "./MoveDestructuredArrayElementMatcher";

export default class MoveDestructuredArrayElementCodeAssist extends CodeAssistType<MoveDestructuredArrayElementMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveDestructuredArrayElementMatcher(),
      MoveTransformation.createPair({
        upActionLabel: "Move array element up",
        downActionLabel: "Move array element down",
        updateContainer: (
          container: ts.ArrayBindingPattern,
          newChildren: Array<ts.ArrayBindingElement>,
          tree
        ) =>
          tree.updateArrayBindingPattern(container, {
            elements: newChildren,
          }),
        analyzeSafety: (match: MoveDestructuredArrayElementMatch) => {
          const messages = new SafetyMessageList();
          messages.warning("changes assigned values");
          return messages.produceUnknown();
        },
      })
    );
  }
}
