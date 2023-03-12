
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertToOptionalChainingMatch } from "./ConvertToOptionalChainingMatch";
import { ConvertToOptionalChainingMatcher } from "./ConvertToOptionalChainingMatcher";
import { ConvertToOptionalChainingTransformation } from "./ConvertToOptionalChainingTransformation";

export default class ConvertToOptionalChainingCodeAssist extends CodeAssistType<ConvertToOptionalChainingMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertToOptionalChainingMatcher(),
      [new ConvertToOptionalChainingTransformation()]
    );
  }
}
