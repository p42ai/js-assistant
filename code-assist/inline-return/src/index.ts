
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { InlineReturnCandidate } from "./InlineReturnCandidate";
import { InlineReturnMatcher } from "./InlineReturnMatcher";
import { InlineReturnTransformation } from "./InlineReturnTransformation";

export default class InlineReturnCodeAssist extends CodeAssistType<InlineReturnCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new InlineReturnMatcher(), [
      new InlineReturnTransformation(),
    ]);
  }
}
