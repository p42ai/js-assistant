
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { SurroundWithJsxFragmentCandidate } from "./SurroundWithJsxFragmentCandidate";
import { SurroundWithJsxFragmentMatcher } from "./SurroundWithJsxFragmentMatcher";
import { SurroundWithJsxFragmentTransformation } from "./SurroundWithJsxFragmentTransformation";

export default class SurroundWithJsxFragmentCodeAssist extends CodeAssistType<SurroundWithJsxFragmentCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new SurroundWithJsxFragmentMatcher(),
      [new SurroundWithJsxFragmentTransformation()]
    );
  }
}
