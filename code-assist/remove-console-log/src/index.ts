
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveConsoleLogCandidate } from "./RemoveConsoleLogCandidate";
import { RemoveConsoleLogMatcher } from "./RemoveConsoleLogMatcher";
import { RemoveConsoleLogTransformation } from "./RemoveConsoleLogTransformation";

export default class RemoveConsoleLogCodeAssist extends CodeAssistType<RemoveConsoleLogCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new RemoveConsoleLogMatcher(), [
      new RemoveConsoleLogTransformation(),
    ]);
  }
}
