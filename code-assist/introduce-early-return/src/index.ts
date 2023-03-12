
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { IntroduceEarlyReturnMatch } from "./IntroduceEarlyReturnMatch";
import { IntroduceEarlyReturnMatcher } from "./IntroduceEarlyReturnMatcher";
import { IntroduceEarlyReturnTransformation } from "./IntroduceEarlyReturnTransformation";

export default class IntroduceEarlyReturnCodeAssist extends CodeAssistType<IntroduceEarlyReturnMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new IntroduceEarlyReturnMatcher(), [
      new IntroduceEarlyReturnTransformation(),
    ]);
  }
}
