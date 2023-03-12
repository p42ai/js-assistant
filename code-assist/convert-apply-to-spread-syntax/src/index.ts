
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertApplyToSpreadSyntaxCandidate } from "./ConvertApplyToSpreadSyntaxCandidate";
import { ConvertApplyToSpreadSyntaxMatcher } from "./ConvertApplyToSpreadSyntaxMatcher";
import { ConvertApplyToSpreadSyntaxTransformation } from "./ConvertApplyToSpreadSyntaxTransformation";

export default class ConvertApplyToSpreadSyntaxCodeAssist extends CodeAssistType<ConvertApplyToSpreadSyntaxCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertApplyToSpreadSyntaxMatcher(),
      [new ConvertApplyToSpreadSyntaxTransformation()]
    );
  }
}
