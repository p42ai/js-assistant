
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { InvertConditionCandidate } from "./InvertConditionCandidate";
import { InvertConditionMatcher } from "./InvertConditionMatcher";
import { InvertConditionTransformation } from "./InvertConditionTransformation";

export default class InvertConditionCodeAssist extends CodeAssistType<InvertConditionCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new InvertConditionMatcher(), [
      new InvertConditionTransformation(),
    ]);
  }
}
