
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { PushDownNegationCandidate } from "./PushDownNegationCandidate";
import { PushDownNegationMatcher } from "./PushDownNegationMatcher";
import { PushDownNegationTransformation } from "./PushDownNegationTransformation";

export default class PushDownNegationCodeAssist extends CodeAssistType<PushDownNegationCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new PushDownNegationMatcher(), [
      new PushDownNegationTransformation(),
    ]);
  }
}
