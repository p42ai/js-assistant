import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import { AddNumericSeparatorCandidate } from "./AddNumericSeparatorCandidate";
import { AddNumericSeparatorMatcher } from "./AddNumericSeparatorMatcher";
import { AddNumericSeparatorTransformation } from "./AddNumericSeparatorTransformation";
import metadata from "./code-assist.json";

export default class AddNumericSeparatorCodeAssist extends CodeAssistType<AddNumericSeparatorCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new AddNumericSeparatorMatcher(), [
      new AddNumericSeparatorTransformation(),
    ]);
  }
}
