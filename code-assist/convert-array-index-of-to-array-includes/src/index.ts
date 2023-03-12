
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertArrayIndexOfToArrayIncludesMatch } from "./ConvertArrayIndexOfToArrayIncludesMatch";
import { ConvertArrayIndexOfToArrayIncludesMatcher } from "./ConvertArrayIndexOfToArrayIncludesMatcher";
import { ConvertArrayIndexOfToArrayIncludesTransformation } from "./ConvertArrayIndexOfToArrayIncludesTransformation";

export default class ConvertArrayIndexOfToArrayIncludesCodeAssist extends CodeAssistType<ConvertArrayIndexOfToArrayIncludesMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertArrayIndexOfToArrayIncludesMatcher(),
      [new ConvertArrayIndexOfToArrayIncludesTransformation()]
    );
  }
}
