
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { UseTemplateLiteralCandidate } from "./UseTemplateLiteralCandidate";
import { UseTemplateLiteralMatcher } from "./UseTemplateLiteralMatcher";
import { UseTemplateLiteralTransformation } from "./UseTemplateLiteralTransformation";

export default class TemplateLiteralCodeAssist extends CodeAssistType<UseTemplateLiteralCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new UseTemplateLiteralMatcher(), [
      new UseTemplateLiteralTransformation(),
    ]);
  }
}
