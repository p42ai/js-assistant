
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { InlineIntoTemplateCandidate } from "./InlineIntoTemplateCandidate";
import { InlineIntoTemplateMatcher } from "./InlineIntoTemplateMatcher";
import { InlineIntoTemplateTransformation } from "./InlineIntoTemplateTransformation";

export default class InlineIntoTemplateCodeAssist extends CodeAssistType<InlineIntoTemplateCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new InlineIntoTemplateMatcher(), [
      new InlineIntoTemplateTransformation(),
    ]);
  }
}
