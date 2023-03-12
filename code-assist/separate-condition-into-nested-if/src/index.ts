
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { SeparateConditionIntoNestedIfCandidate } from "./SeparateConditionIntoNestedIfCandidate";
import { SeparateConditionIntoNestedIfMatcher } from "./SeparateConditionIntoNestedIfMatcher";
import { SeparateConditionIntoNestedIfTransformation } from "./SeparateConditionIntoNestedIfTransformation";

export default class SeparateConditionIntoNestedIfCodeAssist extends CodeAssistType<SeparateConditionIntoNestedIfCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new SeparateConditionIntoNestedIfMatcher(),
      [new SeparateConditionIntoNestedIfTransformation()]
    );
  }
}
