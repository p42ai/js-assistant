import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertLoopToForWithIndexCandidate } from "./ConvertLoopToForWithIndexCandidate";
import { ConvertLoopToForWithIndexMatcher } from "./ConvertLoopToForWithIndexMatcher";
import { ConvertLoopToForWithIndexTransformation } from "./ConvertLoopToForWithIndexTransformation";

export default class ConvertLoopToForWithIndexCodeAssist extends CodeAssistType<ConvertLoopToForWithIndexCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertLoopToForWithIndexMatcher(),
      [new ConvertLoopToForWithIndexTransformation()]
    );
  }
}
