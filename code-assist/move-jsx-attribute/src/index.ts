
import {
  CodeAssistMetadata,
  CodeAssistType,
  MoveTransformation,
} from "@p42/engine";
import ts from "typescript";
import metadata from "./code-assist.json";
import { MoveJsxAttributeMatch } from "./MoveJsxAttributeMatch";
import { MoveJsxAttributeMatcher } from "./MoveJsxAttributeMatcher";

export default class MoveJsxAttributeCodeAssist extends CodeAssistType<MoveJsxAttributeMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveJsxAttributeMatcher(),
      MoveTransformation.createPair({
        upActionLabel: "Move attribute up",
        downActionLabel: "Move attribute down",
        updateContainer: (
          container: ts.JsxAttributes,
          newChildren: Array<ts.JsxAttributeLike>,
          tree
        ) =>
          tree.updateJsxAttributes(container, {
            properties: newChildren,
          }),
      })
    );
  }
}
