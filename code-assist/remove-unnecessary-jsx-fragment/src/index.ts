
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveUnnecessaryJsxFragmentCandidate } from "./RemoveUnnecessaryJsxFragmentCandidate";
import { RemoveUnnecessaryJsxFragmentMatcher } from "./RemoveUnnecessaryJsxFragmentMatcher";
import { RemoveUnnecessaryJsxFragmentTransformation } from "./RemoveUnnecessaryJsxFragmentTransformation";

export default class RemoveUnnecessaryJsxFragmentCodeAssist extends CodeAssistType<RemoveUnnecessaryJsxFragmentCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new RemoveUnnecessaryJsxFragmentMatcher(),
      [new RemoveUnnecessaryJsxFragmentTransformation()]
    );
  }
}
