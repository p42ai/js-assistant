
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveUnnecessaryTemplateCandidate } from "./RemoveUnnecessaryTemplateCandidate";
import { RemoveUnnecessaryTemplateMatcher } from "./RemoveUnnecessaryTemplateMatcher";
import { RemoveUnnecessaryTemplateTransformation } from "./RemoveUnnecessaryTemplateTransformation";

export default class RemoveUnnecessaryTemplateCodeAssist extends CodeAssistType<RemoveUnnecessaryTemplateCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new RemoveUnnecessaryTemplateMatcher(),
      [new RemoveUnnecessaryTemplateTransformation()]
    );
  }
}
