
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ReplaceLodashSomeWithJavascriptArraySomeCandidate } from "./ReplaceLodashSomeWithJavascriptArraySomeCandidate";
import { ReplaceLodashSomeWithJavascriptArraySomeMatcher } from "./ReplaceLodashSomeWithJavascriptArraySomeMatcher";
import { ReplaceLodashSomeWithJavascriptArraySomeTransformation } from "./ReplaceLodashSomeWithJavascriptArraySomeTransformation";

export default class ReplaceLodashSomeWithJavascriptArraySomeCodeAssist extends CodeAssistType<ReplaceLodashSomeWithJavascriptArraySomeCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ReplaceLodashSomeWithJavascriptArraySomeMatcher(),
      [new ReplaceLodashSomeWithJavascriptArraySomeTransformation()]
    );
  }
}
