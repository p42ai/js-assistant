
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { MergeNestedIfCandidate } from "./MergeNestedIfCandidate";
import { MergeNestedIfMatcher } from "./MergeNestedIfMatcher";
import { MergeNestedIfTransformation } from "./MergeNestedIfTransformation";

export default class MergeNestedIfCodeAssist extends CodeAssistType<MergeNestedIfCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new MergeNestedIfMatcher(), [
      new MergeNestedIfTransformation(),
    ]);
  }
}
