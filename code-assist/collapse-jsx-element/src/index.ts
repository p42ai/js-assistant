
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { CollapseJsxElementCandidate } from "./CollapseJsxElementCandidate";
import { CollapseJsxElementMatcher } from "./CollapseJsxElementMatcher";
import { CollapseJsxElementTransformation } from "./CollapseJsxElementTransformation";

export default class CollapseJsxElementCodeAssist extends CodeAssistType<CollapseJsxElementCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new CollapseJsxElementMatcher(), [
      new CollapseJsxElementTransformation(),
    ]);
  }
}
