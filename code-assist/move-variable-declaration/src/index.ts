
import {
  CodeAssistMetadata,
  CodeAssistType,
  MoveTransformation,
} from "@p42/engine";
import ts from "typescript";
import metadata from "./code-assist.json";
import { MoveVariableDeclarationMatch } from "./MoveVariableDeclarationMatch";
import { MoveVariableDeclarationMatcher } from "./MoveVariableDeclarationMatcher";

export default class MoveVariableDeclarationCodeAssist extends CodeAssistType<MoveVariableDeclarationMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveVariableDeclarationMatcher(),
      MoveTransformation.createPair({
        upActionLabel: "Move variable declaration up",
        downActionLabel: "Move variable declaration down",
        updateContainer: (
          container: ts.VariableDeclarationList,
          newChildren: Array<ts.VariableDeclaration>,
          tree
        ) =>
          tree.updateVariableDeclarationList(container, {
            declarations: newChildren,
          }),
      })
    );
  }
}
