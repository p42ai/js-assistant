
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveEmptyIfBlockCandidate } from "./RemoveEmptyIfBlockCandidate";
import { RemoveEmptyIfBlockMatcher } from "./RemoveEmptyIfBlockMatcher";
import { RemoveEmptyIfBlockTransformation } from "./RemoveEmptyIfBlockTransformation";

export default class RemoveEmptyIfBlockCodeAssist extends CodeAssistType<RemoveEmptyIfBlockCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new RemoveEmptyIfBlockMatcher(), [
      new RemoveEmptyIfBlockTransformation(),
    ]);
  }
}
