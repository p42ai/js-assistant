
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveUnnecessaryExpressionStatementCandidate } from "./RemoveUnnecessaryExpressionStatementCandidate";
import { RemoveUnnecessaryExpressionStatementMatcher } from "./RemoveUnnecessaryExpressionStatementMatcher";
import { RemoveUnnecessaryExpressionStatementTransformation } from "./RemoveUnnecessaryExpressionStatementTransformation";

export default class RemoveUnnecessaryExpressionStatementCodeAssist extends CodeAssistType<RemoveUnnecessaryExpressionStatementCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new RemoveUnnecessaryExpressionStatementMatcher(),
      [new RemoveUnnecessaryExpressionStatementTransformation()]
    );
  }
}
