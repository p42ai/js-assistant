
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { UseEqEqNullCandidate } from "./UseEqEqNullCandidate";
import { UseEqEqNullMatcher } from "./UseEqEqNullMatcher";
import { UseEqEqNullTransformation } from "./UseEqEqNullTransformation";

export default class UseEqEqNullCodeAssist extends CodeAssistType<UseEqEqNullCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new UseEqEqNullMatcher(), [
      new UseEqEqNullTransformation(),
    ]);
  }
}
