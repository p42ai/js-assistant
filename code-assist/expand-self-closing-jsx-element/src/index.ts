
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ExpandSelfClosingJsxElementCandidate } from "./ExpandSelfClosingJsxElementCandidate";
import { ExpandSelfClosingJsxElementMatcher } from "./ExpandSelfClosingJsxElementMatcher";
import { ExpandSelfClosingJsxElementTransformation } from "./ExpandSelfClosingJsxElementTransformation";

export default class ExpandSelfClosingJsxTagCodeAssist extends CodeAssistType<ExpandSelfClosingJsxElementCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ExpandSelfClosingJsxElementMatcher(),
      [new ExpandSelfClosingJsxElementTransformation()]
    );
  }
}
