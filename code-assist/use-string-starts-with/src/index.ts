
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { UseStringStartsWithMatcher } from "./UseStringStartsWithMatcher";
import { UseStringStartsWithCandidate } from "./UseStringStartsWithCandidate";
import { UseStringStartsWithTransformation } from "./UseStringStartsWithTransformation";

export default class UseStringStartsWithCodeAssist extends CodeAssistType<UseStringStartsWithCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new UseStringStartsWithMatcher(), [
      new UseStringStartsWithTransformation(),
    ]);
  }
}
