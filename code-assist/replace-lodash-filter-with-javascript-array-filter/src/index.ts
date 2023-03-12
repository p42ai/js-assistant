
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ReplaceLodashFilterWithJavascriptArrayFilterCandidate } from "./ReplaceLodashFilterWithJavascriptArrayFilterCandidate";
import { ReplaceLodashFilterWithJavascriptArrayFilterMatcher } from "./ReplaceLodashFilterWithJavascriptArrayFilterMatcher";
import { ReplaceLodashFilterWithJavascriptArrayFilterTransformation } from "./ReplaceLodashFilterWithJavascriptArrayFilterTransformation";

export default class ReplaceLodashFilterWithJavascriptArrayFilterCodeAssist extends CodeAssistType<ReplaceLodashFilterWithJavascriptArrayFilterCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ReplaceLodashFilterWithJavascriptArrayFilterMatcher(),
      [new ReplaceLodashFilterWithJavascriptArrayFilterTransformation()]
    );
  }
}
