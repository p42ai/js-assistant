
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { PushParameterIntoIifeCandidate } from "./PushParameterIntoIifeCandidate";
import { PushParameterIntoIifeMatcher } from "./PushParameterIntoIifeMatcher";
import { PushParameterIntoIifeTransformation } from "./PushParameterIntoIifeTransformation";

export default class PushParameterIntoIifeCodeAssist extends CodeAssistType<PushParameterIntoIifeCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new PushParameterIntoIifeMatcher(), [
      new PushParameterIntoIifeTransformation(),
    ]);
  }
}
