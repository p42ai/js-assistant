
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertLoopToForOfCandidate } from "./ConvertLoopToForOfCandidate";
import { ConvertLoopToForOfMatcher } from "./ConvertLoopToForOfMatcher";
import { ConvertLoopToForOfTransformation } from "./ConvertLoopToForOfTransformation";

export default class ConvertLoopToForOfCodeAssist extends CodeAssistType<ConvertLoopToForOfCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new ConvertLoopToForOfMatcher(), [
      new ConvertLoopToForOfTransformation(),
    ]);
  }
}
