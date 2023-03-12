
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { UseNullishCoalescenceInDefaultExpressionCandidate } from "./UseNullishCoalescenceInDefaultExpressionCandidate";
import { UseNullishCoalescenceInDefaultExpressionMatcher } from "./UseNullishCoalescenceInDefaultExpressionMatcher";
import { UseNullishCoalescenceInDefaultExpressionTransformation } from "./UseNullishCoalescenceInDefaultExpressionTransformation";

export default class UseNullishCoalescenceInDefaultExpressionCodeAssist extends CodeAssistType<UseNullishCoalescenceInDefaultExpressionCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new UseNullishCoalescenceInDefaultExpressionMatcher(),
      [new UseNullishCoalescenceInDefaultExpressionTransformation()]
    );
  }
}
