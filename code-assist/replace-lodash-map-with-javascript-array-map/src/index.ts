
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ReplaceLodashMapWithJavascriptArrayMapCandidate } from "./ReplaceLodashMapWithJavascriptArrayMapCandidate";
import { ReplaceLodashMapWithJavascriptArrayMapMatcher } from "./ReplaceLodashMapWithJavascriptArrayMapMatcher";
import { ReplaceLodashMapWithJavascriptArrayMapTransformation } from "./ReplaceLodashMapWithJavascriptArrayMapTransformation";

export default class ConvertLodashMapToJavascriptArrayMapCodeAssist extends CodeAssistType<ReplaceLodashMapWithJavascriptArrayMapCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ReplaceLodashMapWithJavascriptArrayMapMatcher(),
      [new ReplaceLodashMapWithJavascriptArrayMapTransformation()]
    );
  }
}
