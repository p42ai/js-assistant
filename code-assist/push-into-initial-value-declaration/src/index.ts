
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { PushIntoInitialValueDeclarationMatch } from "./PushIntoInitialValueDeclarationMatch";
import { PushIntoInitialValueDeclarationMatcher } from "./PushIntoInitialValueDeclarationMatcher";
import { PushIntoInitialValueDeclarationTransformation } from "./PushIntoInitialValueDeclarationTransformation";

export default class PushIntoInitialValueDeclarationCodeAssist extends CodeAssistType<PushIntoInitialValueDeclarationMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new PushIntoInitialValueDeclarationMatcher(),
      [new PushIntoInitialValueDeclarationTransformation()]
    );
  }
}
