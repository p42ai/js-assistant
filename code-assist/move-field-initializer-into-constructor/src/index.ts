
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { MoveFieldInitializerIntoConstructorMatch } from "./MoveFieldInitializerIntoConstructorMatch";
import { MoveFieldInitializerIntoConstructorMatcher } from "./MoveFieldInitializerIntoConstructorMatcher";
import { MoveFieldInitializerIntoConstructorTransformation } from "./MoveFieldInitializerIntoConstructorTransformation";

export default class MoveFieldInitializerIntoConstructorCodeAssist extends CodeAssistType<MoveFieldInitializerIntoConstructorMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveFieldInitializerIntoConstructorMatcher(),
      [new MoveFieldInitializerIntoConstructorTransformation()]
    );
  }
}
