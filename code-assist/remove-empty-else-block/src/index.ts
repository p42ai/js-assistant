
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveEmptyElseBlockCandidate } from "./RemoveEmptyElseBlockCandidate";
import { RemoveEmptyElseBlockMatcher } from "./RemoveEmptyElseBlockMatcher";
import { RemoveEmptyElseBlockTransformation } from "./RemoveEmptyElseBlockTransformation";

export default class RemoveEmptyElseBlockCodeAssist extends CodeAssistType<RemoveEmptyElseBlockCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new RemoveEmptyElseBlockMatcher(), [
      new RemoveEmptyElseBlockTransformation(),
    ]);
  }
}
