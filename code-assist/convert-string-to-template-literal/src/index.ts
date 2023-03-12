import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertStringToTemplateLiteralCandidate } from "./ConvertStringToTemplateLiteralCandidate";
import { ConvertStringToTemplateLiteralMatcher } from "./ConvertStringToTemplateLiteralMatcher";
import { ConvertStringToTemplateLiteralTransformation } from "./ConvertStringToTemplateLiteralTransformation";

export default class ConvertStringToTemplateLiteralCodeAssist extends CodeAssistType<ConvertStringToTemplateLiteralCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertStringToTemplateLiteralMatcher(),
      [new ConvertStringToTemplateLiteralTransformation()]
    );
  }
}
