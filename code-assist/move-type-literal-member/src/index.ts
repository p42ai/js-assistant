
import {
  CodeAssistMetadata,
  CodeAssistType,
  MoveTransformation,
} from "@p42/engine";
import ts from "typescript";
import metadata from "./code-assist.json";
import { MoveTypeLiteralMemberMatch } from "./MoveTypeLiteralMemberMatch";
import { MoveTypeLiteralMemberMatcher } from "./MoveTypeLiteralMemberMatcher";

export default class MoveTypeLiteralMemberCodeAssist extends CodeAssistType<MoveTypeLiteralMemberMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveTypeLiteralMemberMatcher(),
      MoveTransformation.createPair({
        upActionLabel: "Move type member up",
        downActionLabel: "Move type member down",
        updateContainer: (
          container: ts.TypeLiteralNode,
          newChildren: Array<ts.TypeElement>,
          tree
        ) =>
          tree.updateTypeLiteralNode(container, {
            members: newChildren,
          }),
      })
    );
  }
}
