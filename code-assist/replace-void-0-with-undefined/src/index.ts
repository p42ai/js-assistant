
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ReplaceVoid0WithUndefinedCandidate } from "./ReplaceVoid0WithUndefinedCandidate";
import { ReplaceVoid0WithUndefinedMatcher } from "./ReplaceVoid0WithUndefinedMatcher";
import { ReplaceVoid0WithUndefinedTransformation } from "./ReplaceVoid0WithUndefinedTransformation";

export default class ReplaceVoid0WithUndefinedCodeAssist extends CodeAssistType<ReplaceVoid0WithUndefinedCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ReplaceVoid0WithUndefinedMatcher(),
      [new ReplaceVoid0WithUndefinedTransformation()]
    );
  }
}
