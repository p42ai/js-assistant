
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { SimplifyBinaryExpressionCandidate } from "./SimplifyBinaryExpressionCandidate";
import { SimplifyBinaryExpressionMatcher } from "./SimplifyBinaryExpressionMatcher";
import { SimplifyBinaryExpressionTransformation } from "./SimplifyBinaryExpressionTransformation";

export default class SimplifyBinaryExpressionCodeAssist extends CodeAssistType<SimplifyBinaryExpressionCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new SimplifyBinaryExpressionMatcher(),
      [new SimplifyBinaryExpressionTransformation()]
    );
  }
}
