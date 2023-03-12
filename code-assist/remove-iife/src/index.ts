
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { RemoveIifeCandidate } from "./RemoveIifeCandidate";
import { RemoveIifeMatcher } from "./RemoveIifeMatcher";
import { RemoveIifeTransformation } from "./RemoveIifeTransformation";

export default class RemoveIifeCodeAssist extends CodeAssistType<RemoveIifeCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new RemoveIifeMatcher(), [
      new RemoveIifeTransformation(),
    ]);
  }
}
