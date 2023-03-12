import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertArrayFilterToFindMatch } from "./ConvertArrayFilterToFindMatch";
import { ConvertArrayFilterToFindMatcher } from "./ConvertArrayFilterToFindMatcher";
import { ConvertArrayFilterToFindTransformation } from "./ConvertArrayFilterToFindTransformation";

export default class ConvertArrayFilterToFindCodeAssist extends CodeAssistType<ConvertArrayFilterToFindMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertArrayFilterToFindMatcher(),
      [new ConvertArrayFilterToFindTransformation()]
    );
  }
}
