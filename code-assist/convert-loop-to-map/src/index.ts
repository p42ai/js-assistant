import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertLoopToMapMatch } from "./ConvertLoopToMapMatch";
import { ConvertLoopToMapMatcher } from "./ConvertLoopToMapMatcher";
import { ConvertLoopToMapTransformation } from "./ConvertLoopToMapTransformation";

export default class ConvertLoopToMapCodeAssist extends CodeAssistType<ConvertLoopToMapMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new ConvertLoopToMapMatcher(), [
      new ConvertLoopToMapTransformation(),
    ]);
  }
}
