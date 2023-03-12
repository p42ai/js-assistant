
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { PushOperatorIntoAssignmentCandidate } from "./PushOperatorIntoAssignmentCandidate";
import { PushOperatorIntoAssignmentMatcher } from "./PushOperatorIntoAssignmentMatcher";
import { PushOperatorIntoAssignmentTransformation } from "./PushOperatorIntoAssignmentTransformation";

export default class PushOperatorIntoAssignmentCodeAssist extends CodeAssistType<PushOperatorIntoAssignmentCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new PushOperatorIntoAssignmentMatcher(),
      [new PushOperatorIntoAssignmentTransformation()]
    );
  }
}
