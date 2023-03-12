
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { FlipOperatorCandidate } from "./FlipOperatorCandidate";
import { FlipOperatorMatcher } from "./FlipOperatorMatcher";
import { FlipOperatorTransformation } from "./FlipOperatorTransformation";

export default class FlipOperatorCodeAssist extends CodeAssistType<FlipOperatorCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new FlipOperatorMatcher(), [
      new FlipOperatorTransformation(),
    ]);
  }
}
