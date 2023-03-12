
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ReplaceExpressionWithExistingVariableMatch } from "./ReplaceExpressionWithExistingVariableMatch";
import { ReplaceExpressionWithExistingVariableMatcher } from "./ReplaceExpressionWithExistingVariableMatcher";
import { ReplaceExpressionWithExistingVariableTransformation } from "./ReplaceExpressionWithExistingVariableTransformation";

export default class ReplaceExpressionWithExistingVariableCodeAssist extends CodeAssistType<ReplaceExpressionWithExistingVariableMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ReplaceExpressionWithExistingVariableMatcher(),
      [new ReplaceExpressionWithExistingVariableTransformation()]
    );
  }
}
