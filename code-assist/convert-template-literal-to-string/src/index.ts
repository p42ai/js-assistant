
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertTemplateLiteralToStringCandidate } from "./ConvertTemplateLiteralToStringCandidate";
import { ConvertTemplateLiteralToStringMatcher } from "./ConvertTemplateLiteralToStringMatcher";
import { ConvertTemplateLiteralToStringTransformation } from "./ConvertTemplateLiteralToStringTransformation";

export default class ConvertTemplateLiteralToStringCodeAssist extends CodeAssistType<ConvertTemplateLiteralToStringCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertTemplateLiteralToStringMatcher(),
      [new ConvertTemplateLiteralToStringTransformation()]
    );
  }
}
