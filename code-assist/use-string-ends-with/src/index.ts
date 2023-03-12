
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { UseStringEndsWithCandidate } from "./UseStringEndsWithCandidate";
import { UseStringEndsWithMatcher } from "./UseStringEndsWithMatcher";
import { UseStringEndsWithTransformation } from "./UseStringEndsWithTransformation";

export default class UseStringEndsWithCodeAssist extends CodeAssistType<UseStringEndsWithCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new UseStringEndsWithMatcher(), [
      new UseStringEndsWithTransformation(),
    ]);
  }
}
