
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { MergeIntoPrecedingDestructuringAssignmentCandidate } from "./MergeIntoPrecedingDestructuringAssignmentCandidate";
import { MergeIntoPrecedingDestructuringAssignmentMatcher } from "./MergeIntoPrecedingDestructuringAssignmentMatcher";
import { MergeIntoPrecedingDestructuringAssignmentTransformation } from "./MergeIntoPrecedingDestructuringAssignmentTransformation";

export default class MergeIntoPrecedingDestructuringAssignmentCodeAssist extends CodeAssistType<MergeIntoPrecedingDestructuringAssignmentCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new MergeIntoPrecedingDestructuringAssignmentMatcher(),
      [new MergeIntoPrecedingDestructuringAssignmentTransformation()]
    );
  }
}
