
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ExtractVariableCandidate } from "./ExtractVariableCandidate";
import { ExtractVariableMatcher } from "./ExtractVariableMatcher";
import { ExtractVariableTransformation } from "./ExtractVariableTransformation";

export default class ExtractVariableCodeAssist extends CodeAssistType<ExtractVariableCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new ExtractVariableMatcher(), [
      new ExtractVariableTransformation(),
    ]);
  }
}
