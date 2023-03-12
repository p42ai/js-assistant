
import {
  CodeAssistMetadata,
  CodeAssistType,
  MoveTransformation,
} from "@p42/engine";
import ts from "typescript";
import metadata from "./code-assist.json";
import { MoveInterfaceMemberMatch } from "./MoveInterfaceMemberMatch";
import { MoveInterfaceMemberMatcher } from "./MoveInterfaceMemberMatcher";

export default class MoveInterfaceMemberCodeAssist extends CodeAssistType<MoveInterfaceMemberMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveInterfaceMemberMatcher(),
      MoveTransformation.createPair({
        upActionLabel: "Move interface member up",
        downActionLabel: "Move interface member down",
        updateContainer: (
          container: ts.InterfaceDeclaration,
          newChildren: Array<ts.TypeElement>,
          tree
        ) =>
          tree.updateInterfaceDeclaration(container, {
            members: newChildren,
          }),
      })
    );
  }
}
