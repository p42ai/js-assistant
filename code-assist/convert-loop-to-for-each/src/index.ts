
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertLoopToForEachCandidate } from "./ConvertLoopToForEachCandidate";
import { ConvertLoopToForEachMatcher } from "./ConvertLoopToForEachMatcher";
import { ConvertLoopToForEachTransformation } from "./ConvertLoopToForEachTransformation";

export default class ConvertLoopToForEachCodeAssist extends CodeAssistType<ConvertLoopToForEachCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new ConvertLoopToForEachMatcher(), [
      new ConvertLoopToForEachTransformation(),
    ]);
  }
}
