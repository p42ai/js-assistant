
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { InlineVariableMatch } from "./InlineVariableMatch";
import { InlineVariableMatcher } from "./InlineVariableMatcher";
import { InlineVariableTransformation } from "./InlineVariableTransformation";

export default class InlineVariableCodeAssist extends CodeAssistType<InlineVariableMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new InlineVariableMatcher(), [
      new InlineVariableTransformation(),
    ]);
  }
}
