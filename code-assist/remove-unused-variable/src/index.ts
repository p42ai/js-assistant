
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveUnusedVariableMatch } from "./RemoveUnusedVariableMatch";
import { RemoveUnusedVariableMatcher } from "./RemoveUnusedVariableMatcher";
import { RemoveUnusedVariableTransformation } from "./RemoveUnusedVariableTransformation";

export default class RemoveUnusedVariableCodeAssist extends CodeAssistType<RemoveUnusedVariableMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new RemoveUnusedVariableMatcher(), [
      new RemoveUnusedVariableTransformation(),
    ]);
  }
}
