
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import { MoveNestedIfMatch } from "./MoveNestedIfMatch";
import { MoveNestedIfMatcher } from "./MoveNestedIfMatcher";
import { MoveNestedIfTransformation } from "./MoveNestedIfTransformation";
import metadata from "./code-assist.json";

export default class MoveNestedIfCodeAssist extends CodeAssistType<MoveNestedIfMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new MoveNestedIfMatcher(), [
      new MoveNestedIfTransformation(),
    ]);
  }
}
