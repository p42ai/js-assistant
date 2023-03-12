
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { SplitAndIntoNestedIfAndDuplicateElseTransformation } from "./SplitAndIntoNestedIfAndDuplicateElseTransformation";
import { SplitAndIntoNestedIfTransformation } from "./SplitAndIntoNestedIfTransformation";
import { SplitIfCandidate } from "./SplitIfCandidate";
import { SplitIfMatcher } from "./SplitIfMatcher";
import { SplitOrIntoElseIfTransformation } from "./SplitOrIntoElseIfTransformation";

export default class SplitIfCodeAssist extends CodeAssistType<SplitIfCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new SplitIfMatcher(), [
      new SplitAndIntoNestedIfTransformation(),
      new SplitAndIntoNestedIfAndDuplicateElseTransformation(),
      new SplitOrIntoElseIfTransformation(),
    ]);
  }
}
