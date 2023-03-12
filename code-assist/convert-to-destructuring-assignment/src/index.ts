
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertToDestructuringAssignmentCandidate } from "./ConvertToDestructuringAssignmentCandidate";
import { ConvertToDestructuringAssignmentMatcher } from "./ConvertToDestructuringAssignmentMatcher";
import { ConvertToDestructuringAssignmentTransformation } from "./ConvertToDestructuringAssignmentTransformation";

export default class ConvertToDestructuringAssignmentCodeAssist extends CodeAssistType<ConvertToDestructuringAssignmentCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(
      metadata as CodeAssistMetadata,
      new ConvertToDestructuringAssignmentMatcher(),
      [new ConvertToDestructuringAssignmentTransformation()]
    );
  }
}
