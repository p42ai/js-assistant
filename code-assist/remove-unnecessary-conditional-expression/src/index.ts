
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveUnnecessaryConditionalExpressionMatch } from "./RemoveUnnecessaryConditionalExpressionMatch";
import { RemoveUnnecessaryConditionalExpressionMatcher } from "./RemoveUnnecessaryConditionalExpressionMatcher";
import { RemoveUnnecessaryConditionalExpressionTransformation } from "./RemoveUnnecessaryConditionalExpressionTransformation";

export default class RemoveUnnecessaryConditionalExpressionCodeAssist extends CodeAssistType<RemoveUnnecessaryConditionalExpressionMatch> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new RemoveUnnecessaryConditionalExpressionMatcher(),
      [new RemoveUnnecessaryConditionalExpressionTransformation()]
    );
  }
}
