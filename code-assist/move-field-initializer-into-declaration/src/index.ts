
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { MoveFieldInitializerIntoDeclarationMatch } from "./MoveFieldInitializerIntoDeclarationMatch";
import { MoveFieldInitializerIntoDeclarationMatcher } from "./MoveFieldInitializerIntoDeclarationMatcher";
import { MoveFieldInitializerIntoDeclarationTransformation } from "./MoveFieldInitializerIntoDeclarationTransformation";

export default class MoveFieldInitializerIntoDeclarationCodeAssist extends CodeAssistType<MoveFieldInitializerIntoDeclarationMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MoveFieldInitializerIntoDeclarationMatcher(),
      [new MoveFieldInitializerIntoDeclarationTransformation()]
    );
  }
}
