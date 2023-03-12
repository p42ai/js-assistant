
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { PullOperatorOutOfAssignmentCandidate } from "./PullOperatorOutOfAssignmentCandidate";
import { PullOperatorOutOfAssignmentMatcher } from "./PullOperatorOutOfAssignmentMatcher";
import { PullOperatorOutOfAssignmentTransformation } from "./PullOperatorOutOfAssignmentTransformation";

export default class PullOperatorOutOfAssignmentCodeAssist extends CodeAssistType<PullOperatorOutOfAssignmentCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new PullOperatorOutOfAssignmentMatcher(),
      [new PullOperatorOutOfAssignmentTransformation()]
    );
  }
}
