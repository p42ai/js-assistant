
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ReplaceLodashEveryWithJavascriptArrayEveryCandidate } from "./ReplaceLodashEveryWithJavascriptArrayEveryCandidate";
import { ReplaceLodashEveryWithJavascriptArrayEveryMatcher } from "./ReplaceLodashEveryWithJavascriptArrayEveryMatcher";
import { ReplaceLodashEveryWithJavascriptArrayEveryTransformation } from "./ReplaceLodashEveryWithJavascriptArrayEveryTransformation";

export default class ReplaceLodashEveryWithJavascriptArrayEveryCodeAssist extends CodeAssistType<ReplaceLodashEveryWithJavascriptArrayEveryCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ReplaceLodashEveryWithJavascriptArrayEveryMatcher(),
      [new ReplaceLodashEveryWithJavascriptArrayEveryTransformation()]
    );
  }
}
