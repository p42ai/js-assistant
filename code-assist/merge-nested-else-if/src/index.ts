
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { MergeNestedElseIfCandidate } from "./MergeNestedElseIfCandidate";
import { MergeNestedElseIfMatcher } from "./MergeNestedElseIfMatcher";
import { MergeNestedElseIfTransformation } from "./MergeNestedElseIfTransformation";

export default class MergeNestedElseCodeAssist extends CodeAssistType<MergeNestedElseIfCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new MergeNestedElseIfMatcher(), [
      new MergeNestedElseIfTransformation(),
    ]);
  }
}
