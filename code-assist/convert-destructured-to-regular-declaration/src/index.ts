
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertDestructuredToRegularDeclarationMatch } from "./ConvertDestructuredToRegularDeclarationMatch";
import { ConvertDestructuredToRegularDeclarationMatcher } from "./ConvertDestructuredToRegularDeclarationMatcher";
import { ConvertDestructuredToRegularDeclarationTransformation } from "./ConvertDestructuredToRegularDeclarationTransformation";

export default class ConvertDestructuredToRegularDeclarationCodeAssist extends CodeAssistType<ConvertDestructuredToRegularDeclarationMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertDestructuredToRegularDeclarationMatcher(),
      [new ConvertDestructuredToRegularDeclarationTransformation()]
    );
  }
}
