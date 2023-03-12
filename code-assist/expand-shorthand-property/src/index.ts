
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ExpandShorthandPropertyCandidate } from "./ExpandShorthandPropertyCandidate";
import { ExpandShorthandPropertyMatcher } from "./ExpandShorthandPropertyMatcher";
import { ExpandShorthandPropertyTransformation } from "./ExpandShorthandPropertyTransformation";

export default class ExpandShorthandPropertyCodeAssist extends CodeAssistType<ExpandShorthandPropertyCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ExpandShorthandPropertyMatcher(),
      [new ExpandShorthandPropertyTransformation()]
    );
  }
}
