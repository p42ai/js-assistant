import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import { AddBracesToJsxAttributeCandidate } from "./AddBracesToJsxAttributeCandidate";
import { AddBracesToJsxAttributeMatcher } from "./AddBracesToJsxAttributeMatcher";
import { AddBracesToJsxAttributeTransformation } from "./AddBracesToJsxAttributeTransformation";
import metadata from "./code-assist.json";

export default class AddBracesToJsxAttributeCodeAssist extends CodeAssistType<AddBracesToJsxAttributeCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new AddBracesToJsxAttributeMatcher(),
      [new AddBracesToJsxAttributeTransformation()]
    );
  }
}
