import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertLetToConstCandidate } from "./ConvertLetToConstCandidate";
import { ConvertLetToConstMatcher } from "./ConvertLetToConstMatcher";
import { ConvertLetToConstTransformation } from "./ConvertLetToConstTransformation";

export default class ConvertLetToConstCodeAssist extends CodeAssistType<ConvertLetToConstCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new ConvertLetToConstMatcher(), [
      new ConvertLetToConstTransformation(),
    ]);
  }
}
