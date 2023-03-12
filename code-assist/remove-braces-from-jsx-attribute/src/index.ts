
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveBracesFromJsxAttributeCandidate } from "./RemoveBracesFromJsxAttributeCandidate";
import { RemoveBracesFromJsxAttributeMatcher } from "./RemoveBracesFromJsxAttributeMatcher";
import { RemoveBracesFromJsxAttributeTransformation } from "./RemoveBracesFromJsxAttributeTransformation";

export default class RemoveBracesFromJsxAttributeCodeAssist extends CodeAssistType<RemoveBracesFromJsxAttributeCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new RemoveBracesFromJsxAttributeMatcher(),
      [new RemoveBracesFromJsxAttributeTransformation()]
    );
  }
}
