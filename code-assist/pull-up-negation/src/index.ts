
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { PullUpNegationCandidate } from "./PullUpNegationCandidate";
import { PullUpNegationMatcher } from "./PullUpNegationMatcher";
import { PullUpNegationTransformation } from "./PullUpNegationTransformation";

export default class PullUpNegationCodeAssist extends CodeAssistType<PullUpNegationCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new PullUpNegationMatcher(), [
      new PullUpNegationTransformation(),
    ]);
  }
}
