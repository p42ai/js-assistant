
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ExtractJsxElementCandidate } from "./ExtractJsxElementCandidate";
import { ExtractJsxElementMatcher } from "./ExtractJsxElementMatcher";
import { ExtractJsxElementTransformation } from "./ExtractJsxElementTransformation";

export default class ExtractJsxElementCodeAssist extends CodeAssistType<ExtractJsxElementCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new ExtractJsxElementMatcher(), [
      new ExtractJsxElementTransformation(),
    ]);
  }
}
