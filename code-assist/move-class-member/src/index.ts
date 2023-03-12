
import {
  CodeAssistMetadata,
  CodeAssistType,
  MoveTransformation,
} from "@p42/engine";
import ts from "typescript";
import metadata from "./code-assist.json";
import { MoveClassMemberMatch } from "./MoveClassMemberMatch";
import { MoveClassMemberMatcher } from "./MoveClassMemberMatcher";

export default class MoveClassMemberCodeAssist extends CodeAssistType<MoveClassMemberMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveClassMemberMatcher(),
      MoveTransformation.createPair({
        upActionLabel: "Move class member up",
        downActionLabel: "Move class member down",
        updateContainer: (
          container: ts.ClassLikeDeclaration,
          newChildren: Array<ts.ClassElement>,
          tree
        ) =>
          // TODO extract tree.updateClassLike
          ts.isClassDeclaration(container)
            ? tree.updateClassDeclaration(container, {
                members: newChildren,
              })
            : tree.updateClassExpression(container, {
                members: newChildren,
              }),
      })
    );
  }
}
