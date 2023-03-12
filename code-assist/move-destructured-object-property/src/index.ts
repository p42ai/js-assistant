
import {
  CodeAssistMetadata,
  CodeAssistType,
  MoveTransformation,
} from "@p42/engine";
import ts from "typescript";
import metadata from "./code-assist.json";
import { MoveDestructuredObjectPropertyMatch } from "./MoveDestructuredObjectPropertyMatch";
import { MoveDestructuredObjectPropertyMatcher } from "./MoveDestructuredObjectPropertyMatcher";

export default class MoveDestructuredObjectPropertyCodeAssist extends CodeAssistType<MoveDestructuredObjectPropertyMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveDestructuredObjectPropertyMatcher(),
      MoveTransformation.createPair({
        upActionLabel: "Move object property up",
        downActionLabel: "Move object property down",
        updateContainer: (
          container: ts.ObjectBindingPattern,
          newChildren: Array<ts.BindingElement>,
          tree
        ) =>
          tree.updateObjectBindingPattern(container, {
            elements: newChildren,
          }),
      })
    );
  }
}
