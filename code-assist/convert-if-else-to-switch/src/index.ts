
import { CodeAssistMetadata, CodeAssistType } from "@p42/engine";
import metadata from "./code-assist.json";
import { ConvertIfElseToSwitchCandidate } from "./ConvertIfElseToSwitchCandidate";
import { ConvertIfElseToSwitchMatcher } from "./ConvertIfElseToSwitchMatcher";
import { ConvertIfElseToSwitchTransformation } from "./ConvertIfElseToSwitchTransformation";

export default class ConvertIfElseToSwitchCodeAssist extends CodeAssistType<ConvertIfElseToSwitchCandidate> {
  static getMetadata(): CodeAssistMetadata {
    return metadata as CodeAssistMetadata;
  }

  constructor() {
    super(metadata as CodeAssistMetadata, new ConvertIfElseToSwitchMatcher(), [
      new ConvertIfElseToSwitchTransformation(),
    ]);
  }
}
