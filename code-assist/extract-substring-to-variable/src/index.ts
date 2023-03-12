
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ExtractSubstringToVariableCandidate } from "./ExtractSubstringToVariableCandidate";
import { ExtractSubstringToVariableMatcher } from "./ExtractSubstringToVariableMatcher";
import { ExtractSubstringToVariableTransformation } from "./ExtractSubstringToVariableTransformation";

export default class ExtractSubstringAsVariableCodeAssist extends CodeAssistType<ExtractSubstringToVariableCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ExtractSubstringToVariableMatcher(),
      [new ExtractSubstringToVariableTransformation()]
    );
  }
}
